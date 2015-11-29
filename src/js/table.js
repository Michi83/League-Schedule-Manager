var updateTableControl = function (table)
{
    $("#table").empty()
    var thead = $("<thead></thead>").appendTo("#table")
    var tr = $("<tr></tr>").appendTo(thead)
    $("<th>" + language["Pos"] + "</th>").appendTo(tr)
    $("<th colspan=\"2\">" + language["Team"] + "</th>").appendTo(tr)
    for (var i = 0; i < statistics.length; i++)
    {
        var statistic = statistics[i]
        if (statistic === "Matches played")
        {
            $("<th>" + language["Pld"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Matches won")
        {
            $("<th>" + language["W"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Matches drawn")
        {
            $("<th>" + language["D"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Matches lost")
        {
            $("<th>" + language["L"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Goals")
        {
            $("<th>" + language["Goals"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Away goals")
        {
            $("<th>" + language["AG"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Goal difference")
        {
            $("<th>" + language["GD"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Goal average")
        {
            $("<th>" + language["GA"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Points")
        {
            $("<th>" + language["Pts"] + "</th>").appendTo(tr)
        }
        else if (statistic === "Change in position")
        {
            $("<th>&#x2195;</th>").appendTo(tr)
        }
    }
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
        for (var j = 0; j < statistics.length; j++)
        {
            var statistic = statistics[j]
            if (statistic === "Matches played")
            {
                $("<td>" + team.played + "</td>").appendTo(tr)
            }
            else if (statistic === "Matches won")
            {
                $("<td>" + team.won + "</td>").appendTo(tr)
            }
            else if (statistic === "Matches drawn")
            {
                $("<td>" + team.drawn + "</td>").appendTo(tr)
            }
            else if (statistic === "Matches lost")
            {
                $("<td>" + team.lost + "</td>").appendTo(tr)
            }
            else if (statistic === "Goals")
            {
                $("<td>" + team.goalsFor + "-" + team.goalsAgainst + "</td>").appendTo(tr)
            }
            else if (statistic === "Away goals")
            {
                $("<td>" + team.awayGoals + "</td>").appendTo(tr)
            }
            else if (statistic === "Goal difference")
            {
                if (team.goalDifference > 0)
                {
                    $("<td>+" + team.goalDifference + "</td>").appendTo(tr)
                }
                else
                {
                    $("<td>" + team.goalDifference + "</td>").appendTo(tr)
                }
            }
            else if (statistic === "Goal average")
            {
                if (team.goalAverage === parseFloat("Infinity"))
                {
                    $("<td>&infin;</td>").appendTo(tr)
                }
                else
                {
                    $("<td>" + Math.round(100 * team.goalAverage) / 100 + "</td>").appendTo(tr)
                }
            }
            else if (statistic === "Points")
            {
                $("<td>" + team.points + "</td>").appendTo(tr)
            }
            else if (statistic === "Change in position")
            {
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
    }
}
