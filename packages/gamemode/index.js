/*
	Credits:
		- MrPancakers
		- Root
		- Buckets
*/

require('./commands.js')
require('./plugins/banking.js')

global.gm = {};

gm.mysql = require('./mysql.js');
gm.auth = require('./auth.js');

gm.mysql.connect(function() { });

mp.events.add("playerChat", (player, text) =>
{   
    if (player.data.admin >= 1) {
        mp.players.broadcast(`${player.name} [Admin ${player.data.admin}]: ${text}`);
    } else {
        mp.players.broadcast(`${player.name}: ${text}`);
    }
});

// RESPAWN POINTS 

mp.events.add('playerDeath', (player) => {
    const respawnPoints = [
        { "x": -425.517, "y": 1123.620, "z": 325.8544 },
        { "x": -415.777, "y": 1168.791, "z": 325.854 },
        { "x": -432.534, "y": 1157.461, "z": 325.854 },
        { "x": -401.850, "y": 1149.482, "z": 325.854 }
    ];
    player.spawn(respawnPoints[Math.floor(Math.random() * respawnPoints.length)]);
    player.health = 100;
    player.notify(`Ai fost teleportat la spawn pentru ca ai murit.`)
});

// CURSOR 

mp.events.addCommand('cursor', () => {
    toggleCursor();
});

mp.events.add('server:CheatDetection', (player,flag) => {
    if(flag=='Unallowed Weapon') {
      player.ban()
    }
	mp.players.broadcast('!{#ff0000}[AntiCheat] Detected ' + flag + ' from ' + player.name)
    console.log(`Detected ${flag} from ${player.name} SC: ${player.socialClub}`)
})

mp.events.add("playerWeaponChange", (player) => {
    player.call('client:weaponSwap')
});

mp.events.add('playerJoin', (player) => {
    player.call('createPlayerHud', [player.name]);

    gm.mysql.handle.query("SELECT username FROM accounts", function (err, res) {
        if (!err) {
            if (res[0].username == player.name) {
                player.call("openLogin", [player.name]);
            } else {
                player.call("openRegister", [player.name]);
            }
        }
    })
});

function PayDay(player) {
    const minute = new Date().getMinutes();

    if (minute == 0) {
    player.data.bankmoney = Math.floor(player.data.bankmoney + (player.data.bankmoney*0.02));
    let timeToAdd = parseFloat(((60 - player.data.hoursPlayed) / 60).toFixed(2));
    player.data.hours = parseFloat((player.data.hours + timeToAdd).toFixed(2));
    player.outputChatBox("PAYDAY!");
    player.outputChatBox(`Venit: ${Math.floor(player.data.bankmoney*0.02)}; Total: ${player.data.bankmoney}`);
    player.outputChatBox(`Hours Played: ${timeToAdd}; Total: ${player.data.hours}`);

    gm.mysql.handle.query("UPDATE `accounts` SET BankMoney = ?, hours = ? WHERE username = ?", [player.data.bankmoney, player.data.hours, player.name], function(err, res) {
        if (!err) {
            player.call("updateHud", [player.name, mp.players.length, player.data.money, player.data.bankmoney]);
            player.data.hoursPlayed = new Date().getMinutes();
        }
    });
    }
}

setInterval(() => {
    mp.players.forEach(player => {
        PayDay(player);
    });
}, 60000);

mp.events.addCommand("PayDayDebug", ( player ) =>{
    if(player.data.admin >= 7) {
        PayDay(player);
    } else {
        player.outputChatBox("Nu ai acces la aceasta comanda!")
    }
})

mp.events.add('playerEnterVehicle', (player, vehicle, seat) => {
    console.log("L")

    // if (vehicle.getClass() == 13) {
    //     return;
    // } else {
        console.log("L")
        if (seat == 0) {
            console.log("L")
            if (player.data.car_lic == 0) {
                console.log("L")
                player.removeFromVehicle();
                player.notify(`Nu ai permis de conducere si ai fost scos din vehicul.`);
                return;
            }
        }
    // }
});