function LogIn(){
    let name = $("#username").val();
    let password = $("#password").val();

    mp.trigger("loginDataToServer", name, password, 0);
}