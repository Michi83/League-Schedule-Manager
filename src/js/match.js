var loadMatchday = function (matchday)
{
    $("#content").empty()
    var row = $("<div class=\"\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
    var h1 = $("<h1>" + (matchday + 1) + ". Spieltag </h1>").appendTo(column)
    if (matchday !== 0)
    {
        var moveUpButton = $("<button class=\"btn btn-warning\">&larr;</button>").appendTo(h1)
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
    $(document.createTextNode(" ")).appendTo(h1)
    if (matchday !== matches.length - 1)
    {
        var moveDownButton = $("<button class=\"btn btn-warning\">&rarr;</button>").appendTo(h1)
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
    var table = $("<table class=\"form-inline table table-striped\"></table>").appendTo(column)
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
            var td, formGroup
            td = $("<td></td>").appendTo(tr)
            formGroup = $("<div class=\"form-group\"></div>").appendTo(td)
            var homeGoalsInput = $("<input class=\"form-control\" min=\"0\" type=\"number\" />").appendTo(formGroup)
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
            formGroup = $("<div class=\"form-group\"></div>").appendTo(td)
            var awayGoalsInput = $("<input class=\"form-control\" min=\"0\" type=\"number\" />").appendTo(formGroup)
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
                var moveUpButton = $("<button class=\"btn btn-warning\">&larr;</button>").appendTo(td)
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
                var moveDownButton = $("<button class=\"btn btn-warning\">&rarr;</button>").appendTo(td)
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
    $("<h2>Tabelle</h2>").appendTo(column)
    $("<table class=\"table table-striped\" id=\"table\"></table>").appendTo(column)
    calculateTable(matchday)
}

var updateMatchdayControl = function ()
{
    $("#matchdays").empty()
    var buttonGroup = $("<div class=\"btn-group\"></div>").appendTo("#matchdays")
    var settings = $("<button class=\"btn btn-default matchday-button\">Einstellungen</button>").appendTo(buttonGroup)
    settings.click
    (
        function ()
        {
            $(".matchday-button").removeClass("active")
            settings.addClass("active")
            $("#content").empty()
            var row = $("<div class=\"row\"></div>").appendTo("#content")
            var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
            $("<h1>Einstellungen</h1>").appendTo(column)
            loadSettings()
        }
    )
    var firstMatchdayButton
    for (var i = 0; i < matches.length; i++)
    {
        var initMatchdayButton = function (i)
        {
            var button = $("<button class=\"btn btn-default matchday-button\">" + (i + 1) + "</button>").appendTo(buttonGroup)
            if (i === 0)
            {
                firstMatchdayButton = button
            }
            button.click
            (
                function ()
                {
                    $(".matchday-button").removeClass("active")
                    button.addClass("active")
                    loadMatchday(i)
                }
            )
        }
        initMatchdayButton(i)
    }
    firstMatchdayButton.click()
}
