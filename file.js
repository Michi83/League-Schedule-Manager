var newFile = function ()
{
    $("#start").hide()
    $("#options").show()
    updateRounds()
    $("#rounds").change(updateRounds)
    $("#teams").arrayControl
    (
        {
            array: teams
        }
    )
    $("#criteria").arrayControl
    (
        {
            array: criteria,
            elements: allCriteria.concat(["head-to-head"]),
            elementNames: criteriumNames,
        }
    )
    $("#head-to-head-criteria").arrayControl
    (
        {
            array: headToHeadCriteria,
            elements: allCriteria,
            elementNames: criteriumNames,
        }
    )
    $("#generate-matches").click(generateMatches)
}

var openFile = function ()
{
    var file = document.getElementById("file").files[0]
    var reader = new FileReader()
    reader.onload = function ()
    {
        var data = reader.result
        data = JSON.parse(data)
        teams = data.teams
        matches = data.matches
        criteria = data.criteria
        headToHeadCriteria = data.headToHeadCriteria
        $("#start").hide()
        updateMatches()
    }
    reader.readAsText(file)
}
