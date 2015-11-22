var loadMatchday = function (matchday)
{
    $("#content").empty()
    var h2 = $("<h2>" + (matchday + 1) + ". Spieltag </h2>").appendTo("#content")
    if (matchday !== 0)
    {
        var moveUpButton = $("<input type=\"button\" value=\"⇦\" />").appendTo(h2)
        moveUpButton.click
        (
            function ()
            {
                 var temp = matches[matchday]
                 matches[matchday] = matches[matchday - 1]
                 matches[matchday - 1] = temp
                 loadMatchday(matchday)
            }
        )
    }
    if (matchday !== matches.length - 1)
    {
        var moveDownButton = $("<input type=\"button\" value=\"⇨\" />").appendTo(h2)
        moveDownButton.click
        (
            function ()
            {
                 var temp = matches[matchday]
                 matches[matchday] = matches[matchday + 1]
                 matches[matchday + 1] = temp
                 loadMatchday(matchday)
            }
        )
    }
    var teamFrequencies = {}
    for (var i = 0; i < matches[matchday].length; i++)
    {
        var match = matches[matchday][i]
        var homeTeam = match.homeTeam
        var awayTeam = match.awayTeam
        if (teamFrequencies[homeTeam] === undefined)
        {
            teamFrequencies[homeTeam] = 0
        }
        if (teamFrequencies[awayTeam] === undefined)
        {
            teamFrequencies[awayTeam] = 0
        }
        teamFrequencies[homeTeam]++
        teamFrequencies[awayTeam]++
    }
    var table = $("<table></table>").appendTo("#content")
    for (var i = 0; i < matches[matchday].length; i++)
    {
        var match = matches[matchday][i]
        var tr = $("<tr></tr>").appendTo(table)
        if (teamFrequencies[match.homeTeam] > 1)
        {
            $("<td class=\"red\">" + match.homeTeam + "</td>").appendTo(tr)
        }
        else
        {
            $("<td>" + match.homeTeam + "</td>").appendTo(tr)
        }
        $("<td>-</td>").appendTo(tr)
        if (teamFrequencies[match.awayTeam] > 1)
        {
            $("<td class=\"red\">" + match.awayTeam + "</td>").appendTo(tr)
        }
        else
        {
            $("<td>" + match.awayTeam + "</td>").appendTo(tr)
        }
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
    return false
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
                    return loadMatchday(i)
                }
            )
        }
        initMatchdayControl(i)
    }
    loadSettings()
}
