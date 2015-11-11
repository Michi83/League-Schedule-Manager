var addTeam = function ()
{
    var team = $("#new-team").val()
    if (team !== "" && teams.indexOf(team) === -1)
    {
        teams.push(team)
        updateTeamList()
    }
    $("#new-team").val("")
}

var updateTeamList = function ()
{
    $("#teams").empty()
    for (var i = 0; i < teams.length; i++)
    {
        var team = teams[i]
        $("<tr><td>" + team + "</td><td><input type=\"button\" value=\"Löschen\" /></td></tr>").appendTo("#teams")
    }
}

$(document).ready
(
    function ()
    {
        $("#add-team").click(addTeam)
    }
)
