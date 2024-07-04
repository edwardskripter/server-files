let loginBrowser;
mp.events.add("openLogin", (name) => {
    loginBrowser = mp.browsers.new("package://loginsys/login/login.html");
    loginBrowser.execute(`$('#username').val('${name}');`);
    mp.gui.cursor.show(true, true);    
});

mp.events.add("openRegister", (username) => {
    loginBrowser = mp.browsers.new("package://loginsys/register/register.html");
    loginBrowser.execute(`$('#username').val('${username}');`);
    mp.gui.cursor.show(true, true); 
});

mp.events.add("loginDataToServer", (user, pass, state) => {
    mp.events.callRemote("sendDataToServer", user, pass, state);
});

mp.events.add("loginHandler", (handle) => {
    switch(handle){
        case "success":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Login successful");
            mp.gui.chat.activate(true);
            mp.gui.cursor.show(false, false);
            break;
        }
        case "registered":
        {
            loginBrowser.destroy();
            mp.gui.chat.push("Registration successful");
            mp.gui.chat.activate(true);
            break;
        }
        case "incorrectinfo":
        {
            loginBrowser.execute(`$(".incorect").css("color", "red");`);
            break;
        }
        case "takeninfo":
        {
            loginBrowser.execute(`$(".taken-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "tooshort":
        {
            loginBrowser.execute(`$(".short-info").show(); $("#registerBtn").show();`);
            break;
        }
        case "logged":
        {
            loginBrowser.execute(`$(".logged").show(); $("#loginBtn").show();`);
            break;
        }
        default:
        {
            break;
        }
    }
});