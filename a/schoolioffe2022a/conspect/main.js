
function renderTree(map) {
    var text = "<ul hidden> <li> <div class='lst'>" + map.title + "</div>";
    if (map.content.length > 0) 
        text += "<span class='text' hidden>" + map.content + "</span>";
    for (var child of map.children) text += renderTree(child);
    return text + "</li> </ul>";
}

$(function() {
    $.get("map.json", function (data) {
        var text = renderTree(data);
        $("#map").html(text);
        $(".lst").each(function () {
            $(this).click(function () {
                $(this).parent().children("ul").toggle();
                $(this).parent().children(".text").toggle();
                $(this).parent().toggleClass("expanded");
            });
        });

        $("ul").first().show();
        $(".lst").first().click();
    });
});
