teams = []
allCriteria = ["points", "goal difference", "goals", "away goals", "won"]
criteriumNames =
{
    "points": "Punkte",
    "goal difference": "Tordifferenz",
    "goals": "Tore",
    "away goals": "Auswärtstore",
    "won": "Siege",
    "head-to-head": "direkter Vergleich"
}
criteria = []
headToHeadCriteria = []

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
    $(".options").hide()
    updateMatchControl()
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
 * - Die Kriterien zerfallen in drei Gruppen, die Kriterien vor dem direkten
 *   Vergleich, im direkten Vergleich und nach dem direkten Vergleich.
 * - Wir setzen alle Mannschaften auf Platz 1 und vergleichen sie paarweise
 *   miteinander nach den Kriterien vor dem direkten Vergleich. Dabei gehen wir
 *   die Kriterien der Reihe nach durch, bis wir eins finden, in dem sich die
 *   Mannschaften unterscheiden. Die schlechtere Mannschaft rutscht einen Platz
 *   ab. Anders gesagt: Der Platz einer Mannschaft ist die Anzahl der besseren
 *   Mannschaften + 1.
 * - Jetzt suchen wir nach Gruppen gleichrangiger Mannschaften und stellen für
 *   sie eine Nebentabelle nach den Kriterien des direkten Vergleichs auf. Wenn
 *   sich der Gleichstand dadurch nur teilweise auflösen lässt, dann wenden wir
 *   den direkten Vergleich erneut an. Das wiederholen wir bis alle Gleichstände
 *   aufgelöst sind oder sich nicht mehr weiter auflösen lassen.
 * - Auf die verbliebenen Gleichstände wenden wir noch die Kriterien nach dem
 *   direkten Vergleich an.
 */
var compareTeams = function (team1, team2, criteria, statistics)
{
    for (var i = 0; i < criteria.length; i++)
    {
        var criterium = criteria[i]
        if (criterium === "points")
        {
            var points1 = 3 * statistics[team1].won + statistics[team1].drawn
            var points2 = 3 * statistics[team2].won + statistics[team2].drawn
            if (points1 !== points2)
            {
                return points1 - points2
            }
        }
        else if (criterium === "goal difference")
        {
            var goalDifference1 = statistics[team1].goalsFor - statistics[team1].goalsAgainst
            var goalDifference2 = statistics[team2].goalsFor - statistics[team2].goalsAgainst
            if (goalDifference1 !== goalDifference2)
            {
                return goalDifference1 - goalDifference2
            }
        }
        else if (criterium === "goals")
        {
            var goals1 = statistics[team1].goalsFor
            var goals2 = statistics[team2].goalsFor
            if (goals1 !== goals2)
            {
                return goals1 - goals2
            }
        }
        else if (criterium === "away goals")
        {
            var awayGoals1 = statistics[team1].awayGoals
            var awayGoals2 = statistics[team2].awayGoals
            if (awayGoals1 !== awayGoals2)
            {
                return awayGoals1 - awayGoals2
            }
        }
        else if (criterium === "won")
        {
            var won1 = statistics[team1].won
            var won2 = statistics[team2].won
            if (won1 !== won2)
            {
                return won1 - won2
            }
        }
    }
    return 0;
}

var calculateTables = function ()
{
    var headToHeadIndex = criteria.indexOf("head-to-head")
    if (headToHeadIndex === -1)
    {
        var criteriaBefore = criteria
    }
    else
    {
        var criteriaBefore = criteria.slice(0, headToHeadIndex)
    }
    var statistics = {}
    for (var i = 0; i < teams.length; i++)
    {
        var team = teams[i]
        statistics[team] = {won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, awayGoals: 0}
    }
    for (var matchday = 0; matchday < matches.length; matchday++)
    {
        // Erst mal Statistiken sammeln.
        for (var i = 0; i < matches[matchday].length; i++)
        {
            var match = matches[matchday][i]
            var homeTeam = match.homeTeam
            var awayTeam = match.awayTeam
            var homeGoals = match.homeGoals
            var awayGoals = match.awayGoals
            if (homeGoals !== undefined && awayGoals !== undefined)
            {
                if (homeGoals > awayGoals)
                {
                    statistics[homeTeam].won++
                    statistics[awayTeam].lost++
                }
                else if (homeGoals === awayGoals)
                {
                    statistics[homeTeam].drawn++
                    statistics[awayTeam].drawn++
                }
                else
                {
                    statistics[awayTeam].won++
                    statistics[homeTeam].lost++
                }
                statistics[homeTeam].goalsFor += homeGoals
                statistics[awayTeam].goalsFor += awayGoals
                statistics[homeTeam].goalsAgainst += awayGoals
                statistics[awayTeam].goalsAgainst += homeGoals
                statistics[awayTeam].awayGoals += awayGoals
            }
        }
        // Jetzt setzen wir erst mal alle Mannschaften auf Platz 1.
        var table = []
        for (var i = 0; i < teams.length; i++)
        {
            var team = teams[i]
            table.push
            (
                {
                    place: 1,
                    team: team,
                    played: statistics[team].won + statistics[team].drawn + statistics[team].lost,
                    won: statistics[team].won,
                    drawn: statistics[team].drawn,
                    lost: statistics[team].lost,
                    goalsFor: statistics[team].goalsFor,
                    goalsAgainst: statistics[team].goalsAgainst,
                    goalDifference: statistics[team].goalsFor - statistics[team].goalsAgainst,
                    points: 3 * statistics[team].won + statistics[team].drawn,
                }
            )
        }
        // Jetzt können wir die Mannschaften paarweise vergleichen nach den
        // Kriterien vor dem direkten Vergleich. Die schlechtere Mannschaft
        // rutscht dabei einen Platz ab. Anders gesagt: Der Platz einer
        // Mannschaft ist die Anzahl der besseren Mannschaften + 1.
        for (var i = 0; i < table.length; i++)
        {
            var team1 = table[i]
            for (var j = i + 1; j < table.length; j++)
            {
                var team2 = table[j]
                var comparison = compareTeams(team1.team, team2.team, criteriaBefore, statistics)
                if (comparison > 0)
                {
                    team2.place++
                }
                else if (comparison < 0)
                {
                    team1.place++
                }
            }
        }
        // Jetzt sortieren wir die Mannschaften nach Platz.
        table.sort
        (
            function (team1, team2)
            {
                return team1.place - team2.place
            }
        )
        if (headToHeadIndex !== -1)
        {
            // Wir suchen nach gleichrangigen Mannschaften und wenden den
            // direkten Vergleich an.
            for (var i = 0, j; i < table.length; i = j)
            {
                for (j = i + 1; j < table.length && table[i].place === table[j].place; j++)
                {
                }
                if (j - i > 1)
                {
                    calculateHeadToHeadTable(table.slice(i, j), matchday)
                }
            }
            // Wir sortieren noch mal nach Platz.
            table.sort
            (
                function (team1, team2)
                {
                    return team1.place - team2.place
                }
            )
            // Und wir suchen noch mal nach gleichrangigen Mannschaften und
            // wenden die Kriterien nach dem direkten Vergleich an.
            for (var i = 0, j; i < table.length; i = j)
            {
                for (j = i + 1; j < table.length && table[i].place === table[j].place; j++)
                {
                }
                calculateTableAfter(table.slice(i, j), statistics)
            }
            // Und ein letztes Mal sortieren.
            table.sort
            (
                function (team1, team2)
                {
                    return team1.place - team2.place
                }
            )
        }
        updateTable(matchday, table)
    }
}

var calculateHeadToHeadTable = function (table, maxMatchday)
{
    var teams = []
    for (var i = 0; i < table.length; i++)
    {
        teams.push(table[i].team)
    }
    // Statistiken für Nebentabelle sammeln
    var statistics = {}
    for (var i = 0; i < teams.length; i++)
    {
        var team = teams[i]
        statistics[team] = {won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, awayGoals: 0}
    }
    for (var matchday = 0; matchday <= maxMatchday; matchday++)
    {
        for (var i = 0; i < matches[matchday].length; i++)
        {
            var match = matches[matchday][i]
            var homeTeam = match.homeTeam
            var awayTeam = match.awayTeam
            var homeGoals = match.homeGoals
            var awayGoals = match.awayGoals
            if (teams.indexOf(homeTeam) !== -1 && teams.indexOf(awayTeam) !== -1 && homeGoals !== undefined && awayGoals !== undefined)
            {
                if (homeGoals > awayGoals)
                {
                    statistics[homeTeam].won++
                    statistics[awayTeam].lost++
                }
                else if (homeGoals === awayGoals)
                {
                    statistics[homeTeam].drawn++
                    statistics[awayTeam].drawn++
                }
                else
                {
                    statistics[awayTeam].won++
                    statistics[homeTeam].lost++
                }
                statistics[homeTeam].goalsFor += homeGoals
                statistics[awayTeam].goalsFor += awayGoals
                statistics[homeTeam].goalsAgainst += awayGoals
                statistics[awayTeam].goalsAgainst += homeGoals
                statistics[awayTeam].awayGoals += awayGoals
            }
        }
    }
    for (var i = 0; i < table.length; i++)
    {
        var team1 = table[i]
        for (var j = i + 1; j < table.length; j++)
        {
            var team2 = table[j]
            var comparison = compareTeams(team1.team, team2.team, headToHeadCriteria, statistics)
            if (comparison > 0)
            {
                team2.place++
            }
            else if (comparison < 0)
            {
                team1.place++
            }
        }
    }
    table.sort
    (
        function (team1, team2)
        {
            return team1.place - team2.place
        }
    )
    // Jetzt suchen wir noch mal nach gleichrangigen Mannschaften und wenden den
    // direkten Vergleich rekursiv an. Aber um uns nicht in eine endlose
    // Rekursion zu verzetteln, machen wir das nicht, wenn der Gleichstand alle
    // Mannschaften betrifft.
    var i, j
    for (i = 0, j; i < table.length; i = j)
    {
        for (j = i + 1; j < table.length && table[i].place === table[j].place; j++)
        {
        }
        if (j - i > 1 && !(i === 0 && j === table.length))
        {
            calculateHeadToHeadTable(table.slice(i, j), maxMatchday)
        }
    }
}

var calculateTableAfter = function (table, statistics)
{
    var criteriaAfter = criteria.slice(criteria.indexOf("head-to-head"))
    for (var i = 0; i < table.length; i++)
    {
        var team1 = table[i]
        for (var j = i + 1; j < table.length; j++)
        {
            var team2 = table[j]
            var comparison = compareTeams(team1.team, team2.team, criteriaAfter, statistics)
            if (comparison > 0)
            {
                team2.place++
            }
            else if (comparison < 0)
            {
                team1.place++
            }
        }
    }
}
