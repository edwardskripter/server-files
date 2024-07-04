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

mp.events.add("openBank", ( money, bankmoney, name, bank_transactions ) => {

    if (!bank) {
        bank = mp.browsers.new("package://bank/index.html");
    }

    let bank_transaction_element = ""

    bank_transactions.forEach(transaction => {
        let amountClass;
        let amountIcon;
        let amountSign;
        let amountColor;

        if (transaction.to_player == 'deposit') {
            amountClass = 'btn-outline-success'
            amountIcon = 'fa-arrow-up' 
            amountSign = '+'
            amountColor = 'text-success text-gradient'
        } else if (transaction.to_player == 'extrage') {
            amountClass = 'btn-outline-danger'
            amountIcon = 'fa-arrow-down'
            amountSign = '-'
            amountColor = 'text-danger text-gradient'
        } else {
            amountClass = 'btn-outline-danger'
            amountIcon = 'fa-arrow-down'
            amountSign = '-'
            amountColor = 'text-danger text-gradient'
        }

        bank_transaction_element += `
            <li class="list-group-item border-0 d-flex justify-content-between ps-0 mb-2 border-radius-lg">
                <div class="d-flex align-items-center">
                    <button class="btn btn-icon-only btn-rounded ${amountClass} mb-0 me-3 btn-sm d-flex align-items-center justify-content-center">
                        <i class="fas ${amountIcon}"></i>
                    </button>
                    <div class="d-flex flex-column">
                        <h6 class="mb-1 text-dark text-sm">${transaction.to_player}</h6>
                        <span class="text-xs">${new Date(transaction.timestamp).toLocaleString()}</span>
                    </div>
                </div>
                <div class="d-flex align-items-center ${amountColor} text-sm font-weight-bold">
                    ${amountSign} $ ${transaction.amount}
                </div>
            </li>
        `;
    })

    let bank_transaction_element_jsoned = JSON.stringify(bank_transaction_element);

    bank.execute(`$('#bank-transactions-list').html(${bank_transaction_element_jsoned});`);

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