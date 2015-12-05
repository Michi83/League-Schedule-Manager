/*
 * In order to generate a schedule, you can do the following:
 * - In the first matchday teams are paired off arbitrarily.
 * - One team in the first or last match is "fixed" and will stay put.
 * - The other teams will rotate (clockwise or counter-clockwise) one position
 *   per matchday.
 *
 * Example with six teams (A is fixed, the others rotate counter-clockwise):
 * A-F  A-E  A-D  A-C  A-B
 * B-E  F-D  E-C  D-B  C-F
 * C-D  B-C  F-B  E-F  D-E
 *
 * To understand why this works, consider the following:
 * - In the last match of a matchday you play against teams one position ahead
 *   or behind.
 * - In the second to last match of a matchday you play against teams three
 *   positions ahead or behind.
 * - In the third to last match of a matchday you play against teams five
 *   positions ahead or behind.
 * - ...
 * - In the second match of a matchday you play against teams two positions
 *   ahead or behind.
 * - In the third match of a matchday you play against teams four positions
 *   ahead or behind.
 * - In the fourth match of a matchday you play against teams six positions
 *   ahead or behind.
 * - ...
 * So each rotating team will play against each rotating team.
 *
 * If there is an odd number of team, we'll add a "phantom team". The team
 * playing against the phantom team has a bye.
 *
 * We would like teams to play at home and on the road alternately.
 * Unfortunately this is impossible: If two teams play at home on the first
 * matchday, they will play on the road on the second, at home on the third and
 * so on. Who will play at home when the play against each other?
 * However we can swap home and away teams every other matchday, so that teams
 * play at home and on the road alternately most of the time.
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
}

/*
 * Calculating tables should be really easy. Every programmer knows sorting
 * algorithms like quicksort and the standard libraries of most programming
 * languages have them built in. Unfortunately these algorithms only work when
 * there is a transitive comparison between elements, i.e. if A > B and B > C
 * then A > C. This is not always the case with head-to-head comparisons. If A
 * is better that B in a head-to-head comparison and B better than C then A is
 * not necessarily better than C.
 *
 * So we use the following method:
 * - The criteria are broken down into three groups: Criteria before
 *   head-to-head comparisons, head-to-head criteria and criteria after
 *   head-to-head comparisons.
 * - Each team is put in position one. Then we do a pairwise comparison of all
 *   teams, where we apply the "before criteria" in order until we find one
 *   where the teams differ. The inferior team drops one position. In other
 *   words: A team's position is the number of superior teams + 1.
 * - Now we search for groups of tied teams and make a subtable for them ordered
 *   by the head-to-head criteria. If this only partially resolved the ties we
 *   repeat this for the remaining ties until either all ties are resolved or
 *   cannot be resolved any further.
 * - Finally we apply the "after criteria" to any remaining ties.
 */
var compareTeams = function (team1, team2, criteria, statistics)
{
    for (var i = 0; i < criteria.length; i++)
    {
        var criterium = criteria[i]
        if (criterium === "Points")
        {
            var points1 = points.win * statistics[team1].won + points.draw * statistics[team1].drawn + points.loss * statistics[team1].lost
            var points2 = points.win * statistics[team2].won + points.draw * statistics[team2].drawn + points.loss * statistics[team2].lost
            if (points1 !== points2)
            {
                return points1 - points2
            }
        }
        else if (criterium === "Goal difference")
        {
            var goalDifference1 = statistics[team1].goalsFor - statistics[team1].goalsAgainst
            var goalDifference2 = statistics[team2].goalsFor - statistics[team2].goalsAgainst
            if (goalDifference1 !== goalDifference2)
            {
                return goalDifference1 - goalDifference2
            }
        }
        else if (criterium === "Goals")
        {
            var goals1 = statistics[team1].goalsFor
            var goals2 = statistics[team2].goalsFor
            if (goals1 !== goals2)
            {
                return goals1 - goals2
            }
        }
        else if (criterium === "Away goals")
        {
            var awayGoals1 = statistics[team1].awayGoals
            var awayGoals2 = statistics[team2].awayGoals
            if (awayGoals1 !== awayGoals2)
            {
                return awayGoals1 - awayGoals2
            }
        }
        else if (criterium === "Goal average")
        {
            var goalAverage1 = statistics[team1].goalsFor / statistics[team1].goalsAgainst
            var goalAverage2 = statistics[team2].goalsFor / statistics[team2].goalsAgainst
            if (isNaN(goalAverage1))
            {
                goalAverage1 = 1
            }
            if (isNaN(goalAverage2))
            {
                goalAverage2 = 1
            }
            if (goalAverage1 !== goalAverage2)
            {
                return goalAverage1 - goalAverage2
            }
        }
        else if (criterium === "Matches won")
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

var calculateTable = function (matchday)
{
    var headToHeadIndex = criteria.indexOf("Head-to-head comparison")
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
    var currentTable, previousTable
    for (var i = 0; i <= matchday; i++)
    {
        // Collect statistics.
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
        /*
         * We make tables for the current and the previous Matchday, so that we
         * can calculate changes in position.
         */
        if (i === matchday || i === matchday - 1)
        {
            // All teams are put in position one.
            var table = []
            for (var j = 0; j < teams.length; j++)
            {
                var team = teams[j]
                var goalAverage = statistics[team].goalsFor / statistics[team].goalsAgainst
                if (isNaN(goalAverage))
                {
                    goalAverage = 1
                }
                table.push
                (
                    {
                        position: 1,
                        team: team,
                        played: statistics[team].won + statistics[team].drawn + statistics[team].lost,
                        won: statistics[team].won,
                        drawn: statistics[team].drawn,
                        lost: statistics[team].lost,
                        goalsFor: statistics[team].goalsFor,
                        goalsAgainst: statistics[team].goalsAgainst,
                        awayGoals: statistics[team].awayGoals,
                        goalDifference: statistics[team].goalsFor - statistics[team].goalsAgainst,
                        goalAverage: goalAverage,
                        points: points.win * statistics[team].won + points.draw * statistics[team].drawn + points.loss * statistics[team].lost,
                    }
                )
            }
            // Now we do pairwise comparisons applying the "before criteria".
            for (var j = 0; j < table.length; j++)
            {
                var team1 = table[j]
                for (var k = j + 1; k < table.length; k++)
                {
                    var team2 = table[k]
                    var comparison = compareTeams(team1.team, team2.team, criteriaBefore, statistics)
                    if (comparison > 0)
                    {
                        team2.position++
                    }
                    else if (comparison < 0)
                    {
                        team1.position++
                    }
                }
            }
            // Sort by position.
            table.sort
            (
                function (team1, team2)
                {
                    return team1.position - team2.position
                }
            )
            if (headToHeadIndex !== -1)
            {
                // Search for tied teams and apply the head-to-head comparison.
                for (var j = 0, k; j < table.length; j = k)
                {
                    for (k = j + 1; k < table.length && table[j].position === table[k].position; k++)
                    {
                    }
                    if (k - j > 1)
                    {
                        calculateHeadToHeadTable(table.slice(j, k), i)
                    }
                }
                // Sort again by position.
                table.sort
                (
                    function (team1, team2)
                    {
                        return team1.position - team2.position
                    }
                )
                // Search for teams still tied and apply "after criteria".
                for (var j = 0, k; j < table.length; j = k)
                {
                    for (k = j + 1; k < table.length && table[j].position === table[k].position; k++)
                    {
                    }
                    if (k - j > 1)
                    {
                        calculateTableAfter(table.slice(j, k), statistics)
                    }
                }
                // Sort one more time.
                table.sort
                (
                    function (team1, team2)
                    {
                        return team1.position - team2.position
                    }
                )
            }
            if (i === matchday)
            {
                currentTable = table
            }
            else
            {
                previousTable = table
            }
        }
    }
    // Changes in position.
    if (matchday > 0)
    {
        var previouspositions = {}
        for (var i = 0; i < previousTable.length; i++)
        {
            var team = previousTable[i]
            previouspositions[team.team] = team.position
        }
        for (var i = 0; i < currentTable.length; i++)
        {
            var team = currentTable[i]
            team.change = team.position - previouspositions[team.team]
        }
    }
    displayTable(currentTable)
}

var calculateHeadToHeadTable = function (table, matchday)
{
    var teams = []
    for (var i = 0; i < table.length; i++)
    {
        teams.push(table[i].team)
    }
    // Collect statistics for subtable.
    var statistics = {}
    for (var i = 0; i < teams.length; i++)
    {
        var team = teams[i]
        statistics[team] = {won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, awayGoals: 0}
    }
    for (var i = 0; i <= matchday; i++)
    {
        for (var j = 0; j < matches[i].length; j++)
        {
            var match = matches[i][j]
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
                team2.position++
            }
            else if (comparison < 0)
            {
                team1.position++
            }
        }
    }
    table.sort
    (
        function (team1, team2)
        {
            return team1.position - team2.position
        }
    )
    // Repeat head-to-head comparison for teams still tied.
    // To avoid an infinite recursion we only do this if not all teams are still tied.
    var i, j
    for (i = 0, j; i < table.length; i = j)
    {
        for (j = i + 1; j < table.length && table[i].position === table[j].position; j++)
        {
        }
        if (j - i > 1 && j - i < table.length)
        {
            calculateHeadToHeadTable(table.slice(i, j), matchday)
        }
    }
}

var calculateTableAfter = function (table, statistics)
{
    var criteriaAfter = criteria.slice(criteria.indexOf("Head-to-head comparison"))
    for (var i = 0; i < table.length; i++)
    {
        var team1 = table[i]
        for (var j = i + 1; j < table.length; j++)
        {
            var team2 = table[j]
            var comparison = compareTeams(team1.team, team2.team, criteriaAfter, statistics)
            if (comparison > 0)
            {
                team2.position++
            }
            else if (comparison < 0)
            {
                team1.position++
            }
        }
    }
}
