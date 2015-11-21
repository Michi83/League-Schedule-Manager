var updateMatchControl = function ()
{
    $("#matches").empty()
    for (var i = 0; i < matches.length; i++)
    {
        var h2 = $("<h2>" + (i + 1) + ". Spieltag </h2>").appendTo("#matches")
        var createButtons = function (i)
        {
            if (i !== 0)
            {
                var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(h2)
                moveUpButton.click
                (
                    function ()
                    {
                        var temp = matches[i]
                        matches[i] = matches[i - 1]
                        matches[i - 1] = temp
                        updateMatchControl()
                    }
                )
            }
            if (i !== matches.length - 1)
            {
                var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(h2)
                moveDownButton.click
                (
                    function ()
                    {
                        var temp = matches[i]
                        matches[i] = matches[i + 1]
                        matches[i + 1] = temp
                        updateMatchControl()
                    }
                )
            }
        }
        createButtons(i)
        var teamFrequencies = {}
        for (var j = 0; j < matches[i].length; j++)
        {
            var match = matches[i][j]
            if (teamFrequencies[match.homeTeam] === undefined)
            {
                teamFrequencies[match.homeTeam] = 0
            }
            if (teamFrequencies[match.awayTeam] === undefined)
            {
                teamFrequencies[match.awayTeam] = 0
            }
            teamFrequencies[match.homeTeam]++
            teamFrequencies[match.awayTeam]++
        }
        var table = $("<table></table>").appendTo("#matches")
        for (var j = 0; j < matches[i].length; j++)
        {
            var match = matches[i][j]
            var tr = $("<tr></tr>").appendTo(table)
            if (teamFrequencies[match.homeTeam] > 1)
            {
                $("<td class=\"red\">" + match.homeTeam + "</td>").appendTo(tr)
            }
            else
            {
                $("<td>" + match.homeTeam + "</td>").appendTo(tr)
            }
            $("<td>-</td>").appendTo(tr)
            if (teamFrequencies[match.awayTeam] > 1)
            {
                $("<td class=\"red\">" + match.awayTeam + "</td>").appendTo(tr)
            }
            else
            {
                $("<td>" + match.awayTeam + "</td>").appendTo(tr)
            }
            var createButtons = function (i, j)
            {
                var td
                var match = matches[i][j]
                td = $("<td></td>").appendTo(tr)
                var homeGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
                if (match.homeGoals !== undefined)
                {
                    homeGoalsInput.val(match.homeGoals)
                }
                homeGoalsInput.change
                (
                    function ()
                    {
                        matches[i][j].homeGoals = parseInt(homeGoalsInput.val())
                        calculateTables()
                    }
                )
                $("<td>:</td>").appendTo(tr)
                td = $("<td></td>").appendTo(tr)
                var awayGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
                if (match.awayGoals !== undefined)
                {
                    awayGoalsInput.val(match.awayGoals)
                }
                awayGoalsInput.change
                (
                    function ()
                    {
                        matches[i][j].awayGoals = parseInt(awayGoalsInput.val())
                        calculateTables()
                    }
                )
                if (i !== 0)
                {
                    td = $("<td></td>").appendTo(tr)
                    var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(td)
                    moveUpButton.click
                    (
                        function ()
                        {
                            matches[i - 1].push(matches[i].splice(j, 1)[0])
                            updateMatchControl()
                        }
                    )
                }
                if (i !== matches.length - 1)
                {
                    td = $("<td></td>").appendTo(tr)
                    var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(td)
                    moveDownButton.click
                    (
                        function ()
                        {
                            matches[i + 1].push(matches[i].splice(j, 1)[0])
                            updateMatchControl()
                        }
                    )
                }
            }
            createButtons(i, j)
        }
        $("<table class=\"table\" data-matchday=\"" + i + "\"></table>").appendTo("#matches")
    }
    var downloadLink = $("<a download=\"spielplan.json\" href=\"\">Spielplan speichern</a>").appendTo("#matches")
    downloadLink.click
    (
        function ()
        {
            var data = {teams: teams, matches: matches, criteria: criteria, headToHeadCriteria: headToHeadCriteria}
            data = JSON.stringify(data)
            data = "data:application/json;base64," + btoa(data)
            downloadLink.attr("href", data)
        }
    )
    calculateTables()
}

var updateRounds = function ()
{
    rounds = parseInt($("#rounds").val())
}

var updateTable = function (matchday, table)
{
    var htmlTable = $(".table[data-matchday=" + matchday + "]")
    htmlTable.empty()
    var tr = $("<tr></tr>").appendTo(htmlTable)
    $("<th></th>").appendTo(tr)
    $("<th></th>").appendTo(tr)
    $("<th>S</th>").appendTo(tr)
    $("<th>G</th>").appendTo(tr)
    $("<th>U</th>").appendTo(tr)
    $("<th>V</th>").appendTo(tr)
    $("<th colspan=\"3\">Tore</th>").appendTo(tr)
    $("<th>TD</th>").appendTo(tr)
    $("<th>P</th>").appendTo(tr)
    for (var i = 0; i < table.length; i++)
    {
        var team = table[i]
        var tr = $("<tr></tr>").appendTo(htmlTable)
        $("<td>" + team.place + ".</td>").appendTo(tr)
        $("<td>" + team.team + "</td>").appendTo(tr)
        $("<td>" + team.played + "</td>").appendTo(tr)
        $("<td>" + team.won + "</td>").appendTo(tr)
        $("<td>" + team.drawn + "</td>").appendTo(tr)
        $("<td>" + team.lost + "</td>").appendTo(tr)
        $("<td>" + team.goalsFor + "</td>").appendTo(tr)
        $("<td>:</td>").appendTo(tr)
        $("<td>" + team.goalsAgainst + "</td>").appendTo(tr)
        $("<td>" + team.goalDifference + "</td>").appendTo(tr)
        $("<td>" + team.points + "</td>").appendTo(tr)
    }
}

$(document).ready
(
    function ()
    {
        $("#new").click(newFile)
        $("#open").click(openFile)
    }
)
