let logIn = null;

mp.events.add("openLogin", ( name ) => {

    if (!logIn) {
        logIn = mp.browsers.new("package://loginsys/login/index.html");
    }

    logIn.execute(`$('#username').val('${name}');`);

    mp.gui.cursor.show(true, true);
});

function hide() {
    logIn.destroy();
    logIn = null;
    mp.gui.cursor.show(false, false);
};

mp.events.add("closeLogIn", () => {
    hide();
});

function LogIn(){
    let name = $("username").val();
    let password = $("#password").val();

    mp.trigger("loginDataToServer", name, password, 0);
}
