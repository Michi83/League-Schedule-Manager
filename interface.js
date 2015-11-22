var initCriteriaControls = function ()
{
    $("#criteria").arrayControl
    (
        {
            array: criteria,
            elements: allCriteria.concat(["head-to-head"]),
            elementNames: criteriumNames,
        }
    )
    $("#head-to-head-criteria").arrayControl
    (
        {
            array: headToHeadCriteria,
            elements: allCriteria,
            elementNames: criteriumNames,
        }
    )
}

var loadSettings = function ()
{
    $("#content").empty()
    $("<h2>Einstellungen</h2>").appendTo("#content")
    $("<h3>Tabellenkriterien</h3>").appendTo("#content")
    $("<div id=\"criteria\"></div>").appendTo("#content")
    $("<h4>Kriterien im direkten Vergleich</h4>").appendTo("#content")
    $("<div id=\"head-to-head-criteria\"></div>").appendTo("#content")
    initCriteriaControls()
}

var updateRounds = function ()
{
    rounds = parseInt($("#rounds").val())
}

var updateTableControl = function (table)
{
    $("#table").empty()
    for (var i = 0; i < table.length; i++)
    {
        var team = table[i]
        var tr = $("<tr></tr>").appendTo("#table")
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
