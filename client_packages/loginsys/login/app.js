mp.events.add("openLogin", ( name ) => {

    mp.gui.cursor.show(true, true);
});

function LogIn(){
    let name = $("#username").val();
    let password = $("#password").val();

    mp.trigger("loginDataToServer", name, password, 0);
}