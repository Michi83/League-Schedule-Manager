/*
 * Ein selbstgebasteltes JQuery-Plugin, mit dem der Benutzer den Inhalt eines
 * Arrays verwalten kann. Man kann Elemente aus einer Drop-Down-Liste
 * hinzufügen, löschen und ihre Reihenfolge ändern. Zu den Optionen gehören:
 * - options.array: Das Array, das verwaltet wird.
 * - options.elements: Mögliche Elemente für das Array. Fehlt diese Option, dann
 *   kann der Benutzer in einem Freitextfeld Elemente eingeben.
 * - options.elementNames: Die Namen der Elemente, die dem Benutzer in der
 *   Drop-Down-Liste angezeigt werden.
 */
$.fn.arrayControl = function (options)
{
    var array = options.array
    var container = this
    var elements = options.elements
    var elementNames = options.elementNames

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
                $("<td>" + elementNames[element] + "</td>").appendTo(tr)
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
                var deleteButton = $("<button class=\"btn btn-danger\">Löschen</button>").appendTo(td)
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
            var addButton = $("<button class=\"btn btn-success\">Hinzufügen</button>").appendTo(td)
            addButton.click
            (
                function ()
                {
                    var element = input.val()
                    // Leere und doppelte Elemente sind nicht erlaubt.
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
                        $("<option value=\"" + element + "\">" + elementNames[element] + "</option>").appendTo(select)
                    }
                }
                td = $("<td></td>").appendTo(tr)
                var addButton = $("<button class=\"btn btn-success\">Hinzufügen</button>").appendTo(td)
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
