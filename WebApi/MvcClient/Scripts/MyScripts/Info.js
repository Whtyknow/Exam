$(document).ready(function () {

    var name = sessionStorage.getItem("Name");
    if (name != null ) {
        var info = $("#info");
        info.empty();
        info.append("span").val("U entered as: " + name);
        var r = $('<input type="button" id="logOut" value="new button"/>');
        info.append(r);
    }
});