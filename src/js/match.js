var displayMatchday = function (matchday)
{
    $("#content").empty()
    var row = $("<div class=\"row\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
    $("<h1>" + language["Matchday"] + " " + (matchday + 1) + "</h1>").appendTo(column)
    var table = $("<table class=\"form-inline table table-layout-fixed table-striped\"></table>").appendTo(column)
    for (var i = 0; i < matches[matchday].length; i++)
    {
        var match = matches[matchday][i]
        var tr = $("<tr></tr>").appendTo(table)
        $("<td class=\"text-align-right\">" + match.homeTeam + "</td>").appendTo(tr)
        var createInputs = function (matchday, i)
        {
            var match = matches[matchday][i]
            var td, formGroup
            td = $("<td class=\"text-align-center\"></td>").appendTo(tr)
            formGroup = $("<div class=\"form-group\"></div>").appendTo(td)
            var homeGoalsInput = $("<input class=\"form-control goal-input\" min=\"0\" type=\"number\" />").appendTo(formGroup)
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
            $(document.createTextNode(" - ")).appendTo(td)
            formGroup = $("<div class=\"form-group\"></div>").appendTo(td)
            var awayGoalsInput = $("<input class=\"form-control goal-input\" min=\"0\" type=\"number\" />").appendTo(formGroup)
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
        }
        createInputs(matchday, i)
        $("<td>" + match.awayTeam + "</td>").appendTo(tr)
    }
    $("<h2>" + language["Table"] + "</h2>").appendTo(column)
    $("<table class=\"table table-striped\" id=\"table\"></table>").appendTo(column)
    calculateTable(matchday)
}

var displayMatchdayMenu = function ()
{
    $("#matchdays").empty()
    var buttonGroup = $("<div class=\"btn-group\"></div>").appendTo("#matchdays")
    var settings = $("<button class=\"btn btn-default matchday-button\">" + language["Settings"] + "</button>").appendTo(buttonGroup)
    settings.click
    (
        function ()
        {
            $(".matchday-button").removeClass("active")
            settings.addClass("active")
            $("#content").empty()
            var row = $("<div class=\"row\"></div>").appendTo("#content")
            var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
            $("<h1>" + language["Settings"] + "</h1>").appendTo(column)
            displaySettings()
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
                    displayMatchday(i)
                }
            )
        }
        initMatchdayButton(i)
    }
    firstMatchdayButton.click()
}
