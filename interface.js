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

var moveCriteriumDown = function (event)
{
    var criterium = parseInt($(event.target).attr("data-criterium"))
    var temp = criteria[criterium]
    criteria[criterium] = criteria[criterium + 1]
    criteria[criterium + 1] = temp
    updateCriteria()
}

var moveCriteriumUp = function (event)
{
    var criterium = parseInt($(event.target).attr("data-criterium"))
    var temp = criteria[criterium]
    criteria[criterium] = criteria[criterium - 1]
    criteria[criterium - 1] = temp
    updateCriteria()
}

var new_ = function ()
{
    $("#start").hide()
    $("#options").show()
    updateRounds()
    $("#rounds").change(updateRounds)
    $("#add-team").click(addTeam)
    updateCriteria()
    $("#generate-matches").click(generateMatches)
}

var open = function ()
{
    var file = document.getElementById("file").files[0]
    var reader = new FileReader()
    reader.onload = function ()
    {
        var data = reader.result
        data = JSON.parse(data)
        teams = data.teams
        matches = data.matches
        criteria = data.criteria
        $("#start").hide()
        updateMatches()
    }
    reader.readAsText(file)
}

var save = function (event)
{
    var data = {teams: teams, matches: matches, criteria: criteria}
    data = JSON.stringify(data)
    data = "data:application/json;base64," + btoa(data)
    $(event.target).attr("href", data)
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
        if (i !== 0)
        {
            $("<td><input class=\"move-criterium-up\" data-criterium=\"" + i + "\" type=\"button\" value=\"↑\"/></td>").appendTo(tr)
        }
        else
        {
            $("<td></td>").appendTo(tr)
        }
        if (i !== criteria.length - 1)
        {
            $("<td><input class=\"move-criterium-down\" data-criterium=\"" + i + "\" type=\"button\" value=\"↓\"/></td>").appendTo(tr)
        }
        else
        {
            $("<td></td>").appendTo(tr)
        }
        $("<td><input class=\"delete-criterium\" data-criterium=\"" + i + "\" type=\"button\" value=\"Löschen\"/></td>").appendTo(tr)
    }
    $(".move-criterium-up").click(moveCriteriumUp)
    $(".move-criterium-down").click(moveCriteriumDown)
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

var updateGoals = function (event)
{
    var target = $(event.target)
    var matchday = parseInt(target.attr("data-matchday"))
    var match = parseInt(target.attr("data-match"))
    var side = target.attr("data-side")
    var goals = parseInt(target.val())
    matches[matchday][match][side] = goals
    calculateTables()
}

var updateMatches = function ()
{
    $("#options").hide()
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
            var td = $("<td></td>").appendTo(tr)
            var homeGoals = $("<input class=\"update-goals\" data-match=\"" + j + "\" data-matchday=\"" + i + "\" data-side=\"homeGoals\" min=\"0\" type=\"number\" />").appendTo(td)
            if (match.homeGoals !== undefined)
            {
                homeGoals.val(match.homeGoals)
            }
            $("<td>:</td>").appendTo(tr)
            var td = $("<td></td>").appendTo(tr)
            var awayGoals = $("<input class=\"update-goals\" data-match=\"" + j + "\" data-matchday=\"" + i + "\" data-side=\"awayGoals\" min=\"0\" type=\"number\" />").appendTo(tr)
            if (match.awayGoals !== undefined)
            {
                awayGoals.val(match.awayGoals)
            }
        }
        $("<table class=\"table\" data-matchday=\"" + i + "\"></table>").appendTo("#matches")
    }
    $("<a download=\"spielplan.json\" href=\"\" id=\"save\">Spielplan speichern</a>").appendTo("#matches")
    $(".update-goals").change(updateGoals)
    $("#save").click(save);
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
        $("<td>" + (team.won + team.drawn + team.lost) + "</td>").appendTo(tr)
        $("<td>" + team.won + "</td>").appendTo(tr)
        $("<td>" + team.drawn + "</td>").appendTo(tr)
        $("<td>" + team.lost + "</td>").appendTo(tr)
        $("<td>" + team.goalsFor + "</td>").appendTo(tr)
        $("<td>:</td>").appendTo(tr)
        $("<td>" + team.goalsAgainst + "</td>").appendTo(tr)
        $("<td>" + (team.goalsFor - team.goalsAgainst) + "</td>").appendTo(tr)
        $("<td>" + (3 * team.won + team.drawn) + "</td>").appendTo(tr)
    }
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
        $("#new").click(new_)
        $("#open").click(open)
    }
)
