allCriteria = ["Points", "Goal difference", "Goals", "Away goals", "Goal average", "Matches won"]

var loadSettings = function ()
{
    var row = $("<div class=\"row\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Tiebreaker criteria"] + "</h2>").appendTo(column)
    $("<div id=\"criteria\"></div>").appendTo(column)
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Head-to-head criteria"] + "</h2>").appendTo(column)
    $("<div id=\"head-to-head-criteria\"></div>").appendTo(column)
    $("#criteria").arrayControl
    (
        {
            array: criteria,
            elements: allCriteria.concat(["Head-to-head comparison"]),
        }
    )
    $("#head-to-head-criteria").arrayControl
    (
        {
            array: headToHeadCriteria,
            elements: allCriteria,
        }
    )
}

var updateTableControl = function (table)
{
    $("#table").empty()
    var thead = $("<thead></thead>").appendTo("#table")
    var tr = $("<tr></tr>").appendTo(thead)
    $("<th>" + language["Pos"] + "</th>").appendTo(tr)
    $("<th colspan=\"2\">" + language["Team"] + "</th>").appendTo(tr)
    $("<th>" + language["Pld"] + "</th>").appendTo(tr)
    $("<th>" + language["W"] + "</th>").appendTo(tr)
    $("<th>" + language["D"] + "</th>").appendTo(tr)
    $("<th>" + language["L"] + "</th>").appendTo(tr)
    $("<th>" + language["Goals"] + "</th>").appendTo(tr)
    $("<th>" + language["GD"] + "</th>").appendTo(tr)
    $("<th>" + language["Pts"] + "</th>").appendTo(tr)
    $("<th></th>").appendTo(tr)
    var tbody = $("<tbody></tbody>").appendTo("#table")
    for (var i = 0; i < table.length; i++)
    {
        var team = table[i]
        var tr = $("<tr></tr>").appendTo(tbody)
        if (i === 0 || team.position !== table[i - 1].position)
        {
            $("<td>" + team.position + "</td>").appendTo(tr)
        }
        else
        {
            $("<td></td>").appendTo(tr)
        }
        $("<td colspan=\"2\">" + team.team + "</td>").appendTo(tr)
        $("<td>" + team.played + "</td>").appendTo(tr)
        $("<td>" + team.won + "</td>").appendTo(tr)
        $("<td>" + team.drawn + "</td>").appendTo(tr)
        $("<td>" + team.lost + "</td>").appendTo(tr)
        $("<td>" + team.goalsFor + "-" + team.goalsAgainst + "</td>").appendTo(tr)
        if (team.goalDifference > 0)
        {
            $("<td>+" + team.goalDifference + "</td>").appendTo(tr)
        }
        else
        {
            $("<td>" + team.goalDifference + "</td>").appendTo(tr)
        }
        $("<td>" + team.points + "</td>").appendTo(tr)
        if (team.change > 0)
        {
            $("<td>&darr;" + team.change + "</td>").appendTo(tr)
        }
        else if (team.change < 0)
        {
            $("<td>&uarr;" + -team.change + "</td>").appendTo(tr)
        }
        else
        {
            $("<td></td>").appendTo(tr)
        }
    }
}
