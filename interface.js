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

var deleteTeam = function (event)
{
    var team = parseInt($(event.target).attr("data-team"))
    teams.splice(team, 1)
    updateTeamList()
}

var updateTeamList = function ()
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
        $("#add-team").click(addTeam)
    }
)
