$(document).ready
(
    function ()
    {
        var navbar = $(".navbar-nav")
        var li
        li = $("<li></li>").appendTo(navbar)
        var newLink = $("<a href=\"#\">" + language["New"] + "</a>").appendTo(li)
        newLink.click
        (
            function ()
            {
                $("#matchdays").empty()
                $("#content").empty()
                var row, column
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                $("<h1>" + language["New league schedule"] + "</h1>").appendTo(column)
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-6\"></div>").appendTo(row)
                $("<h2>" + language["Settings"] + "</h2>").appendTo(column)
                var formGroup = $("<div class=\"form-group\"></div>").appendTo(column)
                $("<label for=\"rounds\">" + language["Number of rounds"] + "</label>").appendTo(formGroup)
                $(document.createTextNode(" ")).appendTo(formGroup)
                rounds = 2
                var roundsInput = $("<input class=\"form-control\" id=\"rounds\" min=\"1\" type=\"number\" value=\"2\" />").appendTo(formGroup)
                roundsInput.change
                (
                    function (event)
                    {
                        rounds = parseInt($(event.target).val())
                    }
                )
                teams = []
                column = $("<div class=\"col-md-6\"></div>").appendTo(row)
                $("<h2>" + language["Teams"] + "</h2>").appendTo(column)
                var teamsInput = $("<div id=\"teams\"></div>").appendTo(column)
                teamsInput.arrayControl({array: teams})
                criteria = []
                headToHeadCriteria = []
                loadSettings()
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                var generateButton = $("<button class=\"btn btn-primary\">" + language["Generate league schedule"] + "</button>").appendTo(column)
                generateButton.click(generateMatches)
                return false
            }
        )

        li = $("<li></li>").appendTo(navbar)
        var openLink = $("<a href=\"#\">" + language["Open"] + "</a>").appendTo(li)
        openLink.click
        (
            function ()
            {
                $("#matchdays").empty()
                $("#content").empty()
                var row, column
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                $("<h1>" + language["Open league schedule"] + "</h1>").appendTo(column)
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                var formInline = $("<div class=\"form-inline\"></div>").appendTo(column)
                $("<input class=\"form-control\" id=\"file\" type=\"file\" />").appendTo(formInline)
                $(document.createTextNode(" ")).appendTo(formInline)
                var openButton = $("<button class=\"btn btn-primary\">" + language["Open league schedule"] + "</button>").appendTo(formInline)
                openButton.click
                (
                    function ()
                    {
                        var file = document.getElementById("file").files[0]
                        var reader = new FileReader()
                        reader.onload = function ()
                        {
                            var data = reader.result
                            data = JSON.parse(decodeURIComponent(data))
                            teams = data.teams
                            matches = data.matches
                            criteria = data.criteria
                            headToHeadCriteria = data.headToHeadCriteria
                            updateMatchdayControl()
                        }
                        reader.readAsText(file)
                    }
                )
                return false
            }
        )

        li = $("<li></li>").appendTo(navbar)
        var saveLink = $("<a download=\"schedule.json\" href=\"#\">" + language["Save"] + "</a>").appendTo(li)
        saveLink.click
        (
            function (event)
            {
                try
                {
                    var data = {teams: teams, matches: matches, criteria: criteria, headToHeadCriteria: headToHeadCriteria}
                    data = JSON.stringify(data)
                    data = "data:application/json," + encodeURIComponent(data)
                    $(event.target).attr("href", data)
                    return true
                }
                catch (exception)
                {
                    return false
                }
            }
        )

        $("<li><a href=\"https://github.com/Michi83/Spielplan-Manager/blob/master/README.md\" target=\"_blank\">" + language["Help"] + "</a></li>").appendTo(navbar)
        $("#intro").html(language["Generates league schedules and tables for football (soccer) tournaments."])
        newLink.click()
    }
)
