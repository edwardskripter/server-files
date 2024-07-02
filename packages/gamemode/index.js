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
});