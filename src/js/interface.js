var loadSettings = function ()
{
    $("#content").empty()
    var row = $("<div class=\"row\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
    $("<h1>Einstellungen</h1>").appendTo(column)
    row = $("<div class=\"row\"></div>").appendTo("#content")
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>Tabellenkriterien</h2>").appendTo(column)
    $("<div id=\"criteria\"></div>").appendTo(column)
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>Kriterien im direkten Vergleich</h2>").appendTo(column)
    $("<div id=\"head-to-head-criteria\"></div>").appendTo(column)
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

var updateTableControl = function (table)
{
    $("#table").empty()
    var thead = $("<thead></thead>").appendTo("#table")
    var tr = $("<tr></tr>").appendTo(thead)
    $("<th></th>").appendTo(tr)
    $("<th></th>").appendTo(tr)
    $("<th>S</th>").appendTo(tr)
    $("<th>G</th>").appendTo(tr)
    $("<th>U</th>").appendTo(tr)
    $("<th>V</th>").appendTo(tr)
    $("<th colspan=\"3\">Tore</th>").appendTo(tr)
    $("<th>TD</th>").appendTo(tr)
    $("<th>P</th>").appendTo(tr)
    var tbody = $("<tbody></tbody>").appendTo("#table")
    for (var i = 0; i < table.length; i++)
    {
        var team = table[i]
        var tr = $("<tr></tr>").appendTo(tbody)
        if (i === 0 || team.place !== table[i - 1].place)
        {
            $("<td>" + team.place + ".</td>").appendTo(tr)
        }
        else
        {
            $("<td></td>").appendTo(tr)
        }
        $("<td>" + team.team + "</td>").appendTo(tr)
        $("<td>" + team.played + "</td>").appendTo(tr)
        $("<td>" + team.won + "</td>").appendTo(tr)
        $("<td>" + team.drawn + "</td>").appendTo(tr)
        $("<td>" + team.lost + "</td>").appendTo(tr)
        $("<td>" + team.goalsFor + "</td>").appendTo(tr)
        $("<td>:</td>").appendTo(tr)
        $("<td>" + team.goalsAgainst + "</td>").appendTo(tr)
        if (team.goalDifference > 0)
        {
            $("<td class=\"align-right\">+" + team.goalDifference + "</td>").appendTo(tr)
        }
        else
        {
            $("<td>" + team.goalDifference + "</td>").appendTo(tr)
        }
        $("<td>" + team.points + "</td>").appendTo(tr)
        if (team.change > 0)
        {
            $("<td>⬇" + team.change + "</td>").appendTo(tr)
        }
        else if (team.change < 0)
        {
            $("<td>⬆" + -team.change + "</td>").appendTo(tr)
        }
    }
}
