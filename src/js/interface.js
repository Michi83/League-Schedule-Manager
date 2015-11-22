var loadSettings = function ()
{
    $("#content").empty()
    $("<h2>Einstellungen</h2>").appendTo("#content")
    $("<h3>Tabellenkriterien</h3>").appendTo("#content")
    $("<div id=\"criteria\"></div>").appendTo("#content")
    $("<h4>Kriterien im direkten Vergleich</h4>").appendTo("#content")
    $("<div id=\"head-to-head-criteria\"></div>").appendTo("#content")
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
    return false
}

var updateTableControl = function (table)
{
    $("#table").empty()
    var tr = $("<tr></tr>").appendTo("#table")
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
        var tr = $("<tr></tr>").appendTo("#table")
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
