teams = []
allCriteria = ["op", "ogd", "og", "oag", "ow", "h2hp", "h2hgd", "h2hg", "h2hag", "h2hw"]
criteriumNames =
{
    op: "Punkte insgesamt",
    ogd: "Tordifferenz insgesamt",
    og: "Tore insgesamt",
    oag: "Auswärtstore insgesamt",
    ow: "Siege insgesamt",
    h2hp: "Punkte im direkten Vergleich",
    h2hgd: "Tordifferenz im direkten Vergleich",
    h2hg: "Tore im direkten Vergleich",
    h2hag: "Auswärtstore im direkten Vergleich",
    h2hw: "Siege im direkten Vergleich",
}
criteria = []

/*
 * Um einen Spielplan zu erstellen, geht man so vor:
 * - Den ersten Spieltag teilt man beliebig ein.
 * - Eine Mannschaft im ersten oder letzten Spiel bleibt "fest" und befindet
 *   sich an allen Spieltagen an derselben Stelle.
 * - Alle anderen Mannschaften rotieren jeden Spieltag um eine Stelle weiter (im
 *   oder gegen den Uhrzeigersinn).
 *
 * Beispiel mit sechs Mannschaften (A bleibt fest, die anderen rotieren gegen
 * den Uhrzeigersinn):
 * A-F  A-E  A-D  A-C  A-B
 * B-E  F-D  E-C  D-B  C-F
 * C-D  B-C  F-B  E-F  D-E
 *
 * Warum das funktioniert, kann man an folgender Überlegung erkennen:
 * - Im letzten Spiel eines Spieltages spielt man gegen die Mannschaften die
 *   eine Stelle entfernt sind.
 * - Im vorletzten Spiel eines Spieltages spielt man gegen die Mannschaften die
 *   drei Stellen entfernt sind.
 * - Im drittletzten Spiel eines Spieltages spielt man gegen die Mannschaften
 *   die fünf Stellen entfernt sind.
 * - ...
 * - Im zweiten Spiel eines Spieltages spielt man gegen die Mannschaften die
 *   zwei Stellen entfernt sind.
 * - Im dritten Spiel eines Spieltages spielt man gegen die Mannschaften die
 *   vier Stellen entfernt sind.
 * - Im vierten Spiel eines Spieltages spielt man gegen die Mannschaften die
 *   sechs Stellen entfernt sind.
 * - ...
 * Jede rotierende Mannschaft spielt damit gegen alle anderen rotierenden
 * Mannschaften.
 *
 * Wenn die Anzahl der Mannschaften ungerade ist, dann fügen wir noch eine
 * "Geistermannschaft" hinzu. Wer gegen die Geistermannschaft spielt, hat
 * spielfrei.
 *
 * Am besten wäre es, wenn jede Mannschaft immer abwechselnd zu hause und
 * auswärts spielen würde. Leider ist das gar nicht möglich, denn wenn zwei
 * Mannschaften beide am ersten Spieltag zuhause spielen, dann müssen sie am
 * zweiten auswärts spielen, am dritten Spieltag zu hause, usw. Wer spielt dann
 * zu hause, wenn die beiden Mannschaften gegeneinander spielen?
 * Wir können aber an jedem zweiten Spieltag Heim- und Auswärtsmannschaft
 * tauschen, dann spielen alle Mannschaften zumindest meistens abwechselnd zu
 * hause und auswärts.
 */
var generateMatches = function ()
{
    var teams2 = teams.slice()
    if (teams2.length % 2 === 1)
    {
        teams2.push(null)
    }
    matches = []
    for (var matchday = 0; matchday < rounds * (teams2.length - 1); matchday++)
    {
        matches.push([])
        for (var match = 0; match < teams2.length / 2; match++)
        {
            if (matchday % 2 === 1)
            {
                var homeTeam = teams2[match]
                var awayTeam = teams2[teams2.length - match - 1]
            }
            else
            {
                var homeTeam = teams2[teams2.length - match - 1]
                var awayTeam = teams2[match]
            }
            if (homeTeam !== null && awayTeam !== null)
            {
                matches[matchday].push({homeTeam: homeTeam, awayTeam: awayTeam})
            }
        }
        teams2 = [teams2[0], teams2[teams2.length - 1]].concat(teams2.slice(1, teams2.length - 1))
    }
    updateMatches()
}

/*
 * Tabellen erstellen wäre eigentlich ganz einfach. Jeder Programmierer kennt
 * Sortieralgorithmen wie Quicksort und in den Standardbibliotheken der meisten
 * Sprachen ist eine Sortierfunktion enthalten. Aber diese Algorithmen
 * funktionieren nur, wenn man die Elemente transitiv vergleichen kann, d.h.
 * wenn A > B und B > C, dann A > C. Leider ist das beim direkten Vergleich
 * nicht immer der Fall. Wenn A im direkten Vergleich besser ist als B und B
 * besser als C, dann ist A nicht unbedingt besser als C.
 *
 * Also gehen wir so vor:
 * - Erst setzen wir alle Mannschaften auf Platz 1.
 * - Dann vergleichen wir die Mannschaften paarweise miteinander. Dabei kommen
 *   der Reihe nach die Tabellenkriterien zur Anwendung bis wir ein Kriterium
 *   finden in dem sich die Mannschaften unterscheiden. Die schlechtere
 *   Mannschaft rutscht einen Platz ab.
 * - Jetzt können wir die Mannschaften transitiv nach Platz vergleichen.
 * Anders gesagt: Der Platz einer Mannschaft ist die Anzahl der besseren
 * Mannschaften + 1.
 *
 * Dieses Verfahren wird beim direkten Vergleich von mehr als zwei Mannschaften
 * nicht immer funktionieren. Dann müsste man eigentlich eine Nebentabelle
 * aufstellen, aber ich sehe momentan keine sinnvolle Möglichkeit, das zu
 * implementieren, ohne alles noch komplizierter zu machen und die freie Wahl
 * der Kriterien einzuschränken.
 */
var calculateTables = function ()
{
    var compareTeams = function (team1, team2)
    {
        for (var i = 0; i < criteria.length; i++)
        {
            var criterium = criteria[i]
            if (criterium === "op")
            {
                var points1 = 3 * overallStats[team1].won + overallStats[team1].drawn
                var points2 = 3 * overallStats[team2].won + overallStats[team2].drawn
                if (points1 > points2)
                {
                    return 1
                }
                else if (points1 < points2)
                {
                    return -1
                }
            }
            else if (criterium === "ogd")
            {
                var goalDifference1 = overallStats[team1].goalsFor - overallStats[team1].goalsAgainst
                var goalDifference2 = overallStats[team2].goalsFor - overallStats[team2].goalsAgainst
                if (goalDifference1 > goalDifference2)
                {
                    return 1
                }
                else if (goalDifference1 < goalDifference2)
                {
                    return -1
                }
            }
            else if (criterium === "og")
            {
                var goals1 = overallStats[team1].goalsFor
                var goals2 = overallStats[team2].goalsFor
                if (goals1 > goals2)
                {
                    return 1
                }
                else if (goals1 < goals2)
                {
                    return -1
                }
            }
            else if (criterium === "oag")
            {
                var awayGoals1 = overallStats[team1].awayGoals
                var awayGoals2 = overallStats[team2].awayGoals
                if (awayGoals1 > awayGoals2)
                {
                    return 1
                }
                else if (awayGoals1 < awayGoals2)
                {
                    return -1
                }
            }
            else if (criterium === "ow")
            {
                var won1 = overallStats[team1].won
                var won2 = overallStats[team2].won
                if (won1 > won2)
                {
                    return 1
                }
                else if (won1 < won2)
                {
                    return -1
                }
            }
            else if (criterium === "h2hp")
            {
                var points1 = 3 * headToHeadStats[team1][team2].won + headToHeadStats[team1][team2].drawn
                var points2 = 3 * headToHeadStats[team2][team1].won + headToHeadStats[team2][team1].drawn
                if (points1 > points2)
                {
                    return 1
                }
                else if (points1 < points2)
                {
                    return -1
                }
            }
            else if (criterium === "h2hgd")
            {
                var goalDifference1 = headToHeadStats[team1][team2].goalsFor - headToHeadStats[team1][team2].goalsAgainst
                var goalDifference2 = headToHeadStats[team2][team1].goalsFor - headToHeadStats[team2][team1].goalsAgainst
                if (goalDifference1 > goalDifference2)
                {
                    return 1
                }
                else if (goalDifference1 < goalDifference2)
                {
                    return -1
                }
            }
            else if (criterium === "h2hg")
            {
                var goals1 = headToHeadStats[team1][team2].goalsFor
                var goals2 = headToHeadStats[team2][team1].goalsFor
                if (goals1 > goals2)
                {
                    return 1
                }
                else if (goals1 < goals2)
                {
                    return -1
                }
            }
            else if (criterium === "h2hag")
            {
                var awayGoals1 = headToHeadStats[team1][team2].awayGoals
                var awayGoals2 = headToHeadStats[team2][team1].awayGoals
                if (awayGoals1 > awayGoals2)
                {
                    return 1
                }
                else if (awayGoals1 < awayGoals2)
                {
                    return -1
                }
            }
            else if (criterium === "h2hw")
            {
                var won1 = headToHeadStats[team1][team2].won
                var won2 = headToHeadStats[team2][team1].won
                if (won1 > won2)
                {
                    return 1
                }
                else if (won1 < won2)
                {
                    return -1
                }
            }
        }
        return 0
    }

    var overallStats = {}
    var headToHeadStats = {}
    for (var i = 0; i < teams.length; i++)
    {
        var team1 = teams[i]
        overallStats[team1] = {won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, awayGoals: 0}
        headToHeadStats[team1] = {}
        for (var j = 0; j < teams.length; j++)
        {
            if (i !== j)
            {
                var team2 = teams[j]
                headToHeadStats[team1][team2] = {won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, awayGoals: 0}
            }
        }
    }
    for (var i = 0; i < matches.length; i++)
    {
        for (var j = 0; j < matches[i].length; j++)
        {
            var match = matches[i][j]
            var homeTeam = match.homeTeam
            var awayTeam = match.awayTeam
            var homeGoals = match.homeGoals
            var awayGoals = match.awayGoals
            if (homeGoals !== undefined && awayGoals !== undefined)
            {
                if (homeGoals > awayGoals)
                {
                    overallStats[homeTeam].won++
                    overallStats[awayTeam].lost++
                    headToHeadStats[homeTeam][awayTeam].won++
                    headToHeadStats[awayTeam][homeTeam].lost++
                }
                else if (homeGoals === awayGoals)
                {
                    overallStats[homeTeam].drawn++
                    overallStats[awayTeam].drawn++
                    headToHeadStats[homeTeam][awayTeam].drawn++
                    headToHeadStats[awayTeam][homeTeam].drawn++
                }
                else
                {
                    overallStats[awayTeam].won++
                    overallStats[homeTeam].lost++
                    headToHeadStats[awayTeam][homeTeam].won++
                    headToHeadStats[homeTeam][awayTeam].lost++
                }
                overallStats[homeTeam].goalsFor += homeGoals
                overallStats[awayTeam].goalsFor += awayGoals
                overallStats[homeTeam].goalsAgainst += awayGoals
                overallStats[awayTeam].goalsAgainst += homeGoals
                overallStats[awayTeam].awayGoals += awayGoals
                headToHeadStats[homeTeam][awayTeam].goalsFor += homeGoals
                headToHeadStats[awayTeam][homeTeam].goalsFor += awayGoals
                headToHeadStats[homeTeam][awayTeam].goalsAgainst += awayGoals
                headToHeadStats[awayTeam][homeTeam].goalsAgainst += homeGoals
                headToHeadStats[awayTeam][homeTeam].awayGoals += awayGoals
            }
        }
        var places = {}
        for (var j = 0; j < teams.length; j++)
        {
            var team = teams[j]
            places[team] = 1
        }
        for (var j = 0; j < teams.length; j++)
        {
            var team1 = teams[j]
            for (var k = j + 1; k < teams.length; k++)
            {
                var team2 = teams[k]
                var result = compareTeams(team1, team2)
                if (result > 0)
                {
                    places[team2]++
                }
                else if (result < 0)
                {
                    places[team1]++
                }
            }
        }
        var table = []
        for (var j = 0; j < teams.length; j++)
        {
            var team = teams[j]
            table.push
            (
                {
                    place: places[team],
                    team: team,
                    won: overallStats[team].won,
                    drawn: overallStats[team].drawn,
                    lost: overallStats[team].lost,
                    goalsFor: overallStats[team].goalsFor,
                    goalsAgainst: overallStats[team].goalsAgainst
                }
            )
        }
        table.sort
        (
            function (a, b)
            {
                return a.place - b.place
            }
        )
        updateTable(i, table)
    }
}
