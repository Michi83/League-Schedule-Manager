var loadMatchday = function (matchday)
{
    $("#content").empty()
    $("<h2>" + (matchday + 1) + ". Spieltag</h2>").appendTo("#content")
    var table = $("<table></table>").appendTo("#content")
    for (var i = 0; i < matches[matchday].length; i++)
    {
        var match = matches[matchday][i]
        var tr = $("<tr></tr>").appendTo(table)
        $("<td>" + match.homeTeam + "</td>").appendTo(tr)
        $("<td>-</td>").appendTo(tr)
        $("<td>" + match.awayTeam + "</td>").appendTo(tr)
        var createButtons = function (matchday, i)
        {
            var match = matches[matchday][i]
            var td
            td = $("<td></td>").appendTo(tr)
            var homeGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
            if (match.homeGoals !== undefined)
            {
                homeGoalsInput.val(match.homeGoals)
            }
            homeGoalsInput.change
            (
                function ()
                {
                    match.homeGoals = parseInt(homeGoalsInput.val())
                    calculateTable(matchday)
                }
            )
            $("<td>:</td>").appendTo(tr)
            td = $("<td></td>").appendTo(tr)
            var awayGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
            if (match.awayGoals !== undefined)
            {
                awayGoalsInput.val(match.awayGoals)
            }
            awayGoalsInput.change
            (
                function ()
                {
                    match.awayGoals = parseInt(awayGoalsInput.val())
                    calculateTable(matchday)
                }
            )
            if (matchday !== 0)
            {
                td = $("<td></td>").appendTo(tr)
                var moveUpButton = $("<input type=\"button\" value=\"⇦\" />").appendTo(td)
                moveUpButton.click
                (
                    function ()
                    {
                        matches[matchday - 1].push(matches[matchday].splice(i, 1)[0])
                        loadMatchday(matchday)
                    }
                )
            }
            if (matchday !== matches.length - 1)
            {
                td = $("<td></td>").appendTo(tr)
                var moveDownButton = $("<input type=\"button\" value=\"⇨\" />").appendTo(td)
                moveDownButton.click
                (
                    function ()
                    {
                        matches[matchday + 1].push(matches[matchday].splice(i, 1)[0])
                        loadMatchday(matchday)
                    }
                )
            }
        }
        createButtons(matchday, i)
    }
    $("<table id=\"table\"></table>").appendTo("#content")
    calculateTable(matchday)
}

var updateMatchdayControl = function ()
{
    var settings = $("<a href=\"#\">Einstellungen</a>").appendTo("#matchdays")
    settings.click(loadSettings)
    for (var i = 0; i < matches.length; i++)
    {
        var initMatchdayControl = function (i)
        {
            var a = $("<a href=\"#\">" + (i + 1) + "</a>").appendTo("#matchdays")
            a.click
            (
                function ()
                {
                    loadMatchday(i)
                }
            )
        }
        initMatchdayControl(i)
    }
    loadSettings()
}