$(function() {
    let loginBox      = $(".login-box"),
        forgetPassBox = $(".forget-pass-box");

    //When clicking on the forget password link
    $(".login-box .login-form a").on("click", function() {
        loginBox.css("display", "none");
        forgetPassBox.css("display", "block");
    });

    //When clicking on the back icon
    $(".forget-pass-box i.back").on("click", function() {
        forgetPassBox.css("display", "none");
        loginBox.css("display", "block");
    });
});