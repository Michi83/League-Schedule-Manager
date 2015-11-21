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
