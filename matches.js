// var updateMatchControl = function ()
// {
//     $("#matches").empty()
//     for (var i = 0; i < matches.length; i++)
//     {
//         var h2 = $("<h2>" + (i + 1) + ". Spieltag </h2>").appendTo("#matches")
//         var createButtons = function (i)
//         {
//             if (i !== 0)
//             {
//                 var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(h2)
//                 moveUpButton.click
//                 (
//                     function ()
//                     {
//                         var temp = matches[i]
//                         matches[i] = matches[i - 1]
//                         matches[i - 1] = temp
//                         updateMatchControl()
//                     }
//                 )
//             }
//             if (i !== matches.length - 1)
//             {
//                 var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(h2)
//                 moveDownButton.click
//                 (
//                     function ()
//                     {
//                         var temp = matches[i]
//                         matches[i] = matches[i + 1]
//                         matches[i + 1] = temp
//                         updateMatchControl()
//                     }
//                 )
//             }
//         }
//         createButtons(i)
//         var teamFrequencies = {}
//         for (var j = 0; j < matches[i].length; j++)
//         {
//             var match = matches[i][j]
//             if (teamFrequencies[match.homeTeam] === undefined)
//             {
//                 teamFrequencies[match.homeTeam] = 0
//             }
//             if (teamFrequencies[match.awayTeam] === undefined)
//             {
//                 teamFrequencies[match.awayTeam] = 0
//             }
//             teamFrequencies[match.homeTeam]++
//             teamFrequencies[match.awayTeam]++
//         }
//         var table = $("<table></table>").appendTo("#matches")
//         for (var j = 0; j < matches[i].length; j++)
//         {
//             var match = matches[i][j]
//             var tr = $("<tr></tr>").appendTo(table)
//             if (teamFrequencies[match.homeTeam] > 1)
//             {
//                 $("<td class=\"red\">" + match.homeTeam + "</td>").appendTo(tr)
//             }
//             else
//             {
//                 $("<td>" + match.homeTeam + "</td>").appendTo(tr)
//             }
//             $("<td>-</td>").appendTo(tr)
//             if (teamFrequencies[match.awayTeam] > 1)
//             {
//                 $("<td class=\"red\">" + match.awayTeam + "</td>").appendTo(tr)
//             }
//             else
//             {
//                 $("<td>" + match.awayTeam + "</td>").appendTo(tr)
//             }
//             var createButtons = function (i, j)
//             {
//                 var td
//                 var match = matches[i][j]
//                 td = $("<td></td>").appendTo(tr)
//                 var homeGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
//                 if (match.homeGoals !== undefined)
//                 {
//                     homeGoalsInput.val(match.homeGoals)
//                 }
//                 homeGoalsInput.change
//                 (
//                     function ()
//                     {
//                         matches[i][j].homeGoals = parseInt(homeGoalsInput.val())
//                         calculateTables()
//                     }
//                 )
//                 $("<td>:</td>").appendTo(tr)
//                 td = $("<td></td>").appendTo(tr)
//                 var awayGoalsInput = $("<input min=\"0\" type=\"number\" />").appendTo(tr)
//                 if (match.awayGoals !== undefined)
//                 {
//                     awayGoalsInput.val(match.awayGoals)
//                 }
//                 awayGoalsInput.change
//                 (
//                     function ()
//                     {
//                         matches[i][j].awayGoals = parseInt(awayGoalsInput.val())
//                         calculateTables()
//                     }
//                 )
//                 if (i !== 0)
//                 {
//                     td = $("<td></td>").appendTo(tr)
//                     var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(td)
//                     moveUpButton.click
//                     (
//                         function ()
//                         {
//                             matches[i - 1].push(matches[i].splice(j, 1)[0])
//                             updateMatchControl()
//                         }
//                     )
//                 }
//                 if (i !== matches.length - 1)
//                 {
//                     td = $("<td></td>").appendTo(tr)
//                     var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(td)
//                     moveDownButton.click
//                     (
//                         function ()
//                         {
//                             matches[i + 1].push(matches[i].splice(j, 1)[0])
//                             updateMatchControl()
//                         }
//                     )
//                 }
//             }
//             createButtons(i, j)
//         }
//         $("<table class=\"table\" data-matchday=\"" + i + "\"></table>").appendTo("#matches")
//     }
//     var downloadLink = $("<a download=\"spielplan.json\" href=\"\">Spielplan speichern</a>").appendTo("#matches")
//     downloadLink.click
//     (
//         function ()
//         {
//             var data = {teams: teams, matches: matches, criteria: criteria, headToHeadCriteria: headToHeadCriteria}
//             data = JSON.stringify(data)
//             data = "data:application/json;base64," + btoa(data)
//             downloadLink.attr("href", data)
//         }
//     )
//     calculateTables()
// }

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
                var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(td)
                moveUpButton.click
                (
                    function ()
                    {
                        matches[matchday - 1].push(matches[i].splice(i, 1)[0])
                        updateMatchControl()
                    }
                )
            }
            if (matchday !== matches.length - 1)
            {
                td = $("<td></td>").appendTo(tr)
                var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(td)
                moveDownButton.click
                (
                    function ()
                    {
                        matches[matchday + 1].push(matches[i].splice(i, 1)[0])
                        updateMatchControl()
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
    $("<a href=\"#\">Einstellungen</a>").appendTo("#matchdays")
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
    loadMatchday(0)
}
