$(document).ready(function () {

    var name = sessionStorage.getItem("Name");
    if (name != null) {

        setInfo();        
    }

    $('body').on("click", "#logOutBtn", function (e) {
        e.preventDefault();
        var uName = $("#userName");
        var logOut = $("#logOut");
        sessionStorage.removeItem("tokenKey");
        sessionStorage.removeItem("Name");
        uName.empty();
        logOut.empty();
        uName.append('<a href="/Home/Register"><span class="glyphicon glyphicon-user"></span> Sign Up</a>');
        logOut.append('<a href="/Home/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a>');

    });

});

function setInfo() {
    var name = sessionStorage.getItem("Name");
    var uName = $("#userName");
    var logOut = $("#logOut");
    uName.empty();
    logOut.empty();

    uName.empty().append('<div style="padding:10px;"> U entered as: ' + name + '</div>').css("color", "white");
    logOut.empty().append('<input type="button" id="logOutBtn" style="padding:10px; margin-top:3px" class="btn btn-info" value="Logout"/>');
}