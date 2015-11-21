$.fn.arrayControl = function (options)
{
    var array = options.array
    var container = this
    var elements = options.elements
    var elementNames = options.elementNames
    var success = options.success

    var updateArrayControl = function ()
    {
        container.empty()
        var table = $("<table></table>").appendTo(container)
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
                $("<td>" + elementNames[element] + "</td>").appendTo(tr)
            }
            var createButtons = function (i)
            {
                var td
                td = $("<td></td>").appendTo(tr)
                if (i !== 0)
                {
                    var moveUpButton = $("<input type=\"button\" value=\"⇧\" />").appendTo(td)
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
                    var moveDownButton = $("<input type=\"button\" value=\"⇩\" />").appendTo(td)
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
                var deleteButton = $("<input type=\"button\" value=\"Löschen\" />").appendTo(td)
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
        if (elements === undefined)
        {
            var input = $("<input />").appendTo(container)
            var addButton = $("<input type=\"button\" value=\"Hinzufügen\" />").appendTo(container)
            addButton.click
            (
                function ()
                {
                    var element = input.val()
                    if (element !== "")
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
                var select = $("<select></select>").appendTo(container)
                for (var i = 0; i < elements.length; i++)
                {
                    var element = elements[i]
                    if (array.indexOf(element) === -1)
                    {
                        $("<option value=\"" + element + "\">" + elementNames[element] + "</option>").appendTo(select)
                    }
                }
                var addButton = $("<input type=\"button\" value=\"Hinzufügen\" />").appendTo(container)
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
        if (success !== undefined)
        {
            success()
        }
    }

    updateArrayControl()
}
