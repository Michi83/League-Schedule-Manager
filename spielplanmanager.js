teams = ["A", "B", "C"]

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
 * Warum das funktioniert, kann man folgender Überlegung erkennen:
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
    for (var matchday = 0; matchday < 2 * (teams2.length - 1); matchday++)
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
}

generateMatches()
for (var i = 0; i < matches.length; i++)
{
    for (var j = 0; j < matches[i].length; j++)
    {
        console.log(matches[i][j])
    }
}
