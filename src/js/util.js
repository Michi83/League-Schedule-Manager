var loadSettings = function ()
{
    var row = $("<div class=\"row\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-4\"></div>").appendTo(row)
    $("<h2>" + language["Tiebreaker criteria"] + "</h2>").appendTo(column)
    var criteriaDiv = $("<div></div>").appendTo(column)
    column = $("<div class=\"col-md-4\"></div>").appendTo(row)
    $("<h2>" + language["Head-to-head criteria"] + "</h2>").appendTo(column)
    var headToHeadCriteriaDiv = $("<div></div>").appendTo(column)
    column = $("<div class=\"col-md-4\"></div>").appendTo(row)
    $("<h2>" + language["Table statistics"] + "</h2>").appendTo(column)
    var statisticsDiv = $("<div></div>").appendTo(column)
    criteriaDiv.arrayControl
    (
        {
            array: criteria,
            elements:
            [
                "Points",
                "Goal difference",
                "Goals", "Away goals",
                "Goal average",
                "Matches won",
                "Head-to-head comparison"
            ],
        }
    )
    headToHeadCriteriaDiv.arrayControl
    (
        {
            array: headToHeadCriteria,
            elements:
            [
                "Points",
                "Goal difference",
                "Goals", "Away goals",
                "Goal average",
                "Matches won"
            ],
        }
    )
    statisticsDiv.arrayControl
    (
        {
            array: statistics,
            elements:
            [
                "Matches played",
                "Matches won",
                "Matches drawn",
                "Matches lost",
                "Goals",
                "Away goals",
                "Goal difference",
                "Goal average",
                "Points",
                "Change in position"
            ],
        }
    )
}
