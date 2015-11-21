var initCriteriaControls = function ()
{
    $("#overall-criteria").arrayControl
    (
        {
            array: criteria,
            elements: allCriteria.concat(["head-to-head"]),
            elementNames: criteriumNames,
            success: calculateTables
        }
    )
    $("#head-to-head-criteria").arrayControl
    (
        {
            array: headToHeadCriteria,
            elements: allCriteria,
            elementNames: criteriumNames,
            success: calculateTables
        }
    )
}

var updateRounds = function ()
{
    rounds = parseInt($("#rounds").val())
}

var updateTableControls = function (tables)
{
    for (var i = 0; i < tables.length; i++)
    {
        var table = tables[i]
        var htmlTable = $(".table[data-matchday=" + i + "]")
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
        for (var j = 0; j < table.length; j++)
        {
            var team = table[j]
            var tr = $("<tr></tr>").appendTo(htmlTable)
            if (j === 0 || team.place !== table[j - 1].place)
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
                $("<td>+" + team.goalDifference + "</td>").appendTo(tr)
            }
            else
            {
                $("<td>" + team.goalDifference + "</td>").appendTo(tr)
            }
            $("<td>" + team.points + "</td>").appendTo(tr)
            if (i > 0)
            {
                if (team.change > 0)
                {
                    $("<td class=\"red\">⬇" + team.change + "</td>").appendTo(tr)
                }
                else if (team.change < 0)
                {
                    $("<td class=\"green\">⬆" + -team.change + "</td>").appendTo(tr)
                }
            }
        }
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
