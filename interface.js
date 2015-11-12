var addCriterium = function ()
{
    var criterium = $("#criterium").val()
    if (criterium !== null)
    {
        criteria.push(criterium)
        updateCriteria()
    }
}

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

var deleteCriterium = function (event)
{
    var criterium = parseInt($(event.target).attr("data-criterium"))
    criteria.splice(criterium, 1)
    updateCriteria()
}

var deleteTeam = function (event)
{
    var team = parseInt($(event.target).attr("data-team"))
    teams.splice(team, 1)
    updateTeams()
}

var updateCriteria = function ()
{
    $("#criteria").empty()
    table = $("<table></table>").appendTo("#criteria")
    for (var i = 0; i < criteria.length; i++)
    {
        var criterium = criteria[i]
        var tr = $("<tr></tr>").appendTo(table)
        $("<td>" + criteriumNames[criterium] + "</td>").appendTo(tr)
        $("<td><input class=\"delete-criterium\" data-criterium=\"" + i + "\" type=\"button\" value=\"Löschen\"/></td>").appendTo(tr)
    }
    $(".delete-criterium").click(deleteCriterium)
    $("<select id=\"criterium\"></select>").appendTo("#criteria")
    for (var i = 0; i < allCriteria.length; i++)
    {
        var criterium = allCriteria[i]
        if (criteria.indexOf(criterium) === -1)
        {
            $("<option value=\"" + criterium + "\">" + criteriumNames[criterium] + "</option>").appendTo("#criterium")
        }
    }
    $("<input id=\"add-criterium\" type=\"button\" value=\"Kriterium hinzufügen\" />").appendTo("#criteria")
    $("#add-criterium").click(addCriterium)
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
        updateCriteria()
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
