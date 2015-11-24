$(document).ready
(
    function ()
    {
        $("#new").click
        (
            function ()
            {
                $("#content").empty()
                var row = $("<div class=\"row\"></div>").appendTo("#content")
                var column = $("<div class=\"col-md-12\"></div>").appendTo(row)
                $("<h1>Neuer Spielplan</h1>").appendTo(column)
                $("<label for=\"rounds\">Anzahl Runden: </label>").appendTo(column)
                rounds = 2
                var roundsInput = $("<input id=\"rounds\" min=\"1\" type=\"number\" value=\"2\" />").appendTo(column)
                roundsInput.change
                (
                    function (event)
                    {
                        rounds = parseInt($(event.target).val())
                    }
                )
                teams = []
                $("<h2>Mannschaften</h2>").appendTo(column)
                var teamsInput = $("<div id=\"teams\"></div>").appendTo(column)
                teamsInput.arrayControl({array: teams})
                criteria = []
                headToHeadCriteria = []
                var generateButton = $("<input type=\"button\" value=\"Spielplan erzeugen\" />").appendTo(column)
                generateButton.click(generateMatches)
                return false
            }
        )

        $("#open").click
        (
            function ()
            {
                $("#content").empty()
                $("<h2>Spielplan öffnen</h2>").appendTo("#content")
                $("<input id=\"file\" type=\"file\" />").appendTo("#content")
                var openButton = $("<input type=\"button\" value=\"Spielplan öffnen\" />").appendTo("#content")
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
