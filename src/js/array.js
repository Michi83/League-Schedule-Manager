/*
 * A jQuery plugin that lets users manage the contents of an array. Elements can
 * be added from a drop-down list, deleted and moved. Options are:
 * - options.array: The array to be managed.
 * - options.elements: An array of admissible elements for the array. Without it
 *   users can add arbitrary elements with a text field.
 */
$.fn.arrayControl = function (options)
{
    var array = options.array
    var container = this
    var elements = options.elements

    var updateArrayControl = function ()
    {
        container.empty()
        var table = $("<table class=\"table table-striped\"></table>").appendTo(container)
        for (var i = 0; i < array.length; i++)
        {
            var element = array[i]
            var tr = $("<tr></tr>").appendTo(table)
            if (elements === undefined)
            {
                $("<td>" + element + "</td>").appendTo(tr)
            }
            else
            {
                $("<td>" + language[element] + "</td>").appendTo(tr)
            }
            var createButtons = function (i)
            {
                var td
                td = $("<td></td>").appendTo(tr)
                if (i !== 0)
                {
                    var moveUpButton = $("<button class=\"btn btn-default\">&uarr;</button>").appendTo(td)
                    moveUpButton.click
                    (
                        function ()
                        {
                            var temp = array[i]
                            array[i] = array[i - 1]
                            array[i - 1] = temp
                            updateArrayControl()
                        }
                    )
                }
                td = $("<td></td>").appendTo(tr)
                if (i !== array.length - 1)
                {
                    var moveDownButton = $("<button class=\"btn btn-default\">&darr;</button>").appendTo(td)
                    moveDownButton.click
                    (
                        function ()
                        {
                            var temp = array[i]
                            array[i] = array[i + 1]
                            array[i + 1] = temp
                            updateArrayControl()
                        }
                    )
                }
                td = $("<td></td>").appendTo(tr)
                var deleteButton = $("<button class=\"btn btn-danger\">" + language["Remove"] + "</button>").appendTo(td)
                deleteButton.click
                (
                    function ()
                    {
                        array.splice(i, 1)
                        updateArrayControl()
                    }
                )
            }
            createButtons(i)
        }
        var tr = $("<tr></tr>").appendTo(table)
        if (elements === undefined)
        {
            var td
            td = $("<td colspan=\"3\"></td>").appendTo(tr)
            var input = $("<input class=\"form-control\" />").appendTo(td)
            td = $("<td></td>").appendTo(tr)
            var addButton = $("<button class=\"btn btn-success\">" + language["Add"] + "</button>").appendTo(td)
            addButton.click
            (
                function ()
                {
                    var element = input.val()
                    // Empty and duplicate elements are not allowed.
                    if (element !== "" && array.indexOf(element) === -1)
                    {
                        array.push(element)
                        updateArrayControl()
                    }
                }
            )
        }
        else
        {
            if (array.length < elements.length)
            {
                var td
                td = $("<td colspan=\"3\"></td>").appendTo(tr)
                var select = $("<select class=\"form-control\"></select>").appendTo(td)
                for (var i = 0; i < elements.length; i++)
                {
                    var element = elements[i]
                    if (array.indexOf(element) === -1)
                    {
                        $("<option value=\"" + element + "\">" + language[element] + "</option>").appendTo(select)
                    }
                }
                td = $("<td></td>").appendTo(tr)
                var addButton = $("<button class=\"btn btn-success\">" + language["Add"] + "</button>").appendTo(td)
                addButton.click
                (
                    function ()
                    {
                        var element = select.val()
                        array.push(element)
                        updateArrayControl()
                    }
                )
            }
        }
    }

    updateArrayControl()
}
