function show(element) {
    if (element == "deposit") {
        $("#container").fadeOut(0);
        $(".DepoziteazaContainer").fadeIn(300);
    } else if (element == 'withdraw') {
        $("#container").fadeOut(0);
        $(".ExtrageContainer").fadeIn(300);
    } else if (element == 'transfer') {
        $("#container").fadeOut(0);
        $(".TransferContainer").fadeIn(300);
    }
};

function hide() {
    bank.destroy();
    bank = null;
    mp.gui.cursor.show(false, false);
    
};

function closeSecondMenu() {
    $(".TransferContainer").fadeOut(0);
    $(".DepoziteazaContainer").fadeOut(0);
    $(".ExtrageContainer").fadeOut(0);
    $("#container").fadeIn(300);
};

let bank = null;
let plname = null;

mp.events.add("openBank", ( money, bankmoney, name ) => {

    if (!bank) {
        bank = mp.browsers.new("package://bank/index.html");
    }

    bank.execute(`$('#playerName').val('${name}');`);
    
    bank.execute(`$('#bank').text('${bankmoney}');`);
    bank.execute(`$('#cash').text('${money}');`);

    mp.gui.cursor.show(true, true);
});

mp.keys.bind(0x1B, false, () => {
    hide();
});

mp.events.add("closeBrowse", () => {
    hide();
});

function DoAction(type) {
    if ($(`${type}-amt`).val() < 0) {
        return;
    }
    if ( type == "transfer") {
        mp.trigger("TransferAction", $(`#${type}-amt`).val(), $("#nume").val());
        return;
    }
    mp.trigger("confirmAction", $(`#${type}-amt`).val(), type);
    mp.trigger("closeBrowse");
};


mp.events.add('confirmAction', (amm, type) => {
    mp.events.callRemote(`${type}Bank`, amm);
})

mp.events.add('TransferAction', (amm, targetName) => {
    mp.events.callRemote("TransferBank", amm, targetName);
});