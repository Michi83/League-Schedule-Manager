$(document).ready
(
    function ()
    {
        $("#new").click
        (
            function ()
            {
                $("#content").empty()
                $("<h2>Neuer Spielplan</h2>").appendTo("#content")
                $("<label for=\"rounds\">Anzahl Runden: </label>").appendTo("#content")
                rounds = 2
                var roundsInput = $("<input id=\"rounds\" min=\"1\" type=\"number\" value=\"2\" />").appendTo("#content")
                roundsInput.change
                (
                    function (event)
                    {
                        rounds = parseInt($(event.target).val())
                    }
                )
                teams = []
                $("<h3>Mannschaften</h3>").appendTo("#content")
                var teamsInput = $("<div id=\"teams\"></div>").appendTo("#content")
                teamsInput.arrayControl({array: teams})
                criteria = []
                headToHeadCriteria = []
                var generateButton = $("<input type=\"button\" value=\"Spielplan erzeugen\" />").appendTo("#content")
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
                var data = {teams: teams, matches: matches, criteria: criteria, headToHeadCriteria: headToHeadCriteria}
                data = JSON.stringify(data)
                data = "data:application/json;base64," + btoa(encodeURIComponent(data))
                $(event.target).attr("href", data)
                return true
            }
        )
    }
)
