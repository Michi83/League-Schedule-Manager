var addTeam = function ()
{
    var team = $("#new-team").val()
    if (team !== "" && teams.indexOf(team) === -1)
    {
        teams.push(team)
        updateTeams()
    }
    $("#new-team").val("")
}

var deleteTeam = function (event)
{
    var team = parseInt($(event.target).attr("data-team"))
    teams.splice(team, 1)
    updateTeams()
}

var updateMatches = function ()
{
    $("#matches").empty()
    for (var i = 0; i < matches.length; i++)
    {
        $("<h2>" + (i + 1) + ". Spieltag</h2>").appendTo("#matches")
        var table = $("<table></table>").appendTo("#matches")
        for (var j = 0; j < matches[i].length; j++)
        {
            var match = matches[i][j]
            var tr = $("<tr></tr>").appendTo(table)
            $("<td>" + match.homeTeam + "</td>").appendTo(tr)
            $("<td>-</td>").appendTo(tr)
            $("<td>" + match.awayTeam + "</td>").appendTo(tr)
            var homeGoals = $("<td><input class=\"update-goals\" data-match=\"" + j + "\" data-matchday=\"" + i + "\" data-side=\"homeGoals\" min=\"0\" type=\"number\" /></td>").appendTo(tr)
            if (match.homeGoals !== undefined)
            {
                $(homeGoals).val(match.homeGoals)
            }
            $("<td>:</td>").appendTo(tr)
            var awayGoals = $("<td><input class=\"update-goals\" data-match=\"" + j + "\" data-matchday=\"" + i + "\" data-side=\"awayGoals\" min=\"0\" type=\"number\" /></td>").appendTo(tr)
            if (match.awayGoals !== undefined)
            {
                $(awayGoals).val(match.awayGoals)
            }
        }
    }
}

var updateRounds = function ()
{
    rounds = parseInt($("#rounds").val())
}

var updateTeams = function ()
{
    $("#teams").empty()
    for (var i = 0; i < teams.length; i++)
    {
        var team = teams[i]
        $("<tr><td>" + team + "</td><td><input data-team=\"" + i + "\" class=\"delete-team\" type=\"button\" value=\"Löschen\" /></td></tr>").appendTo("#teams")
    }
    $(".delete-team").click(deleteTeam)
}

$(document).ready
(
    function ()
    {
        updateRounds()
        $("#rounds").change(updateRounds)
        $("#add-team").click(addTeam)
        $("#generate-matches").click
        (
            function ()
            {
                generateMatches()
                updateMatches()
            }
        )
    }
)
