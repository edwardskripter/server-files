function Register(){
    let name = $("#username").val();
    let password = $("#password").val();
    let secondpassword = $("#2ndpassword").val();
    let email = $("email").val();

    if (password == secondpassword) {
        mp.trigger("loginDataToServer", name, password, 1);
    } else {
        password.css("color", "red");
        secondpassword.css("color", "red");
    }
}