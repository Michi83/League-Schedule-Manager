$(document).ready
(
    function ()
    {
        $("#new").click
        (
            function ()
            {
                $("#matchdays").empty()
                $("#content").empty()
                var row, column
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                $("<h1>Neuer Spielplan</h1>").appendTo(column)
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-6\"></div>").appendTo(row)
                $("<h2>Einstellungen</h2>").appendTo(column)
                var formGroup = $("<div class=\"form-group\"></div>").appendTo(column)
                $("<label for=\"rounds\">Anzahl Runden</label>").appendTo(formGroup)
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
                $("<h2>Mannschaften</h2>").appendTo(column)
                var teamsInput = $("<div id=\"teams\"></div>").appendTo(column)
                teamsInput.arrayControl({array: teams})
                criteria = []
                headToHeadCriteria = []
                loadSettings()
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                var generateButton = $("<button class=\"btn btn-primary\">Spielplan generieren</button>").appendTo(column)
                generateButton.click(generateMatches)
                return false
            }
        )

        $("#open").click
        (
            function ()
            {
                $("#matchdays").empty()
                $("#content").empty()
                var row, column
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                $("<h1>Spielplan öffnen</h1>").appendTo(column)
                row = $("<div class=\"row\"></div>").appendTo("#content")
                column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                var formInline = $("<div class=\"form-inline\"></div>").appendTo(column)
                $("<input class=\"form-control\" id=\"file\" type=\"file\" />").appendTo(formInline)
                $(document.createTextNode(" ")).appendTo(formInline)
                var openButton = $("<button class=\"btn btn-primary\">Spielplan öffnen</button>").appendTo(formInline)
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

        $("#save").click
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
    }
)
