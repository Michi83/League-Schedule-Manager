var newFile = function ()
{
    $("#start").hide()
    $(".options").show()
    $("#criteria").show()
    updateRounds()
    $("#rounds").change(updateRounds)
    $("#teams").arrayControl
    (
        {
            array: teams
        }
    )
    initCriteriaControls()
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
        initCriteriaControls()
        $("#criteria").show()
        updateMatchControl()
    }
    reader.readAsText(file)
}
