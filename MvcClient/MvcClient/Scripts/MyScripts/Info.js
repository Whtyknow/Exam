$(document).ready(function () {

    var name = sessionStorage.getItem("Name");
    if (name != null) {

        var uName = $("#userName");
        var logOut = $("#logOut");
        uName.empty();
        logOut.empty();

        uName.empty().append('<span> U entered as: ' + name + '</span>').css("color", "white");
        logOut.empty().append('<input type="button" id="logOut" class="btn btn-info" value="Logout"/>');

        $('#logOut').click(function (e) {
            e.preventDefault();
            sessionStorage.removeItem("tokenKey");
            sessionStorage.removeItem("Name");
            uName.empty();
            logOut.empty();
            uName.append('<a href="/Home/Register"><span class="glyphicon glyphicon-user"></span> Sign Up</a>');
            logOut.append('<a href="/Home/Login"><span class="glyphicon glyphicon-log-in"></span> Login</a>');
            
        });
    }    
});