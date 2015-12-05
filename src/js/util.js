var displaySettings = function ()
{
    var row, column
    row = $("<div class=\"row\"></div>").appendTo("#content")
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Points"] + "</h2>").appendTo(column)
    var formGroup, input
    formGroup = $("<div class=\"form-group\"></div>").appendTo(column)
    $("<label for=\"win\">" + language["For a win"] + "</label>").appendTo(formGroup)
    input = $("<input class=\"form-control\" id=\"win\" type=\"number\" />").appendTo(formGroup)
    input.val(points.win)
    input.change
    (
        function (event)
        {
            points.win = $(event.target).val()
        }
    )
    formGroup = $("<div class=\"form-group\"></div>").appendTo(column)
    $("<label for=\"draw\">" + language["For a draw"] + "</label>").appendTo(formGroup)
    input = $("<input class=\"form-control\" id=\"draw\" type=\"number\" />").appendTo(formGroup)
    input.val(points.draw)
    input.change
    (
        function (event)
        {
            points.draw = $(event.target).val()
        }
    )
    formGroup = $("<div class=\"form-group\"></div>").appendTo(column)
    $("<label for=\"loss\">" + language["For a loss"] + "</label>").appendTo(formGroup)
    input = $("<input class=\"form-control\" id=\"loss\" type=\"number\" />").appendTo(formGroup)
    input.val(points.loss)
    input.change
    (
        function (event)
        {
            points.loss = $(event.target).val()
        }
    )
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Table statistics"] + "</h2>").appendTo(column)
    var statisticsDiv = $("<div></div>").appendTo(column)
    row = $("<div class=\"row\"></div>").appendTo("#content")
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Tiebreaker criteria"] + "</h2>").appendTo(column)
    var criteriaDiv = $("<div></div>").appendTo(column)
    column = $("<div class=\"col-md-6\"></div>").appendTo(row)
    $("<h2>" + language["Head-to-head criteria"] + "</h2>").appendTo(column)
    var headToHeadCriteriaDiv = $("<div></div>").appendTo(column)
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
}
