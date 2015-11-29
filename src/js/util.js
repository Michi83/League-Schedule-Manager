allCriteria = ["Points", "Goal difference", "Goals", "Away goals", "Goal average", "Matches won"]

var loadSettings = function ()
{
    var row = $("<div class=\"row\"></div>").appendTo("#content")
    var column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Tiebreaker criteria"] + "</h2>").appendTo(column)
    $("<div id=\"criteria\"></div>").appendTo(column)
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Head-to-head criteria"] + "</h2>").appendTo(column)
    $("<div id=\"head-to-head-criteria\"></div>").appendTo(column)
    $("#criteria").arrayControl
    (
        {
            array: criteria,
            elements: allCriteria.concat(["Head-to-head comparison"]),
        }
    )
    $("#head-to-head-criteria").arrayControl
    (
        {
            array: headToHeadCriteria,
            elements: allCriteria,
        }
    )
}
