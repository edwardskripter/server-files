require('login.js');
require('./loginsys/login/app.js');
require('./loginsys/register/app.js');
require('./bank/assets/js/app');
require('./base/blips.js');
require('./admin/noclip.js');
require('./anticheat/index.js');
require('./hud/interface.js');
require('./levels/index.js');
require('./textui/app.js');
require('./dmv/index_files/index.js');
mp.gui.chat.show(true);
mp.gui.chat.activate(false);

mp.events.add('setDiscordStatus', (serverName, status) => {
    mp.discord.update(serverName, status)
});

const colour = { r: 255, g: 255, b: 102 }; 
const serverName = 'linkmania rpg'; 

mp.events.add('playerReady', () => {
  mp.game.invoke('0xF314CF4F0211894E', 143, colour.r, colour.g, colour.b, 255); 
  mp.game.gxt.set('PM_PAUSE_HDR', serverName);
});

// discord.js

mp.events.call('setDiscordStatus', 'LinkMania RPG', `Online: ${mp.players.length}`);

let cursorVisible = false;

function toggleCursor() {
    cursorVisible = !cursorVisible;
    mp.gui.cursor.show(cursorVisible, cursorVisible);
}

mp.keys.bind(0xC0, true, function() {
    toggleCursor();
});

mp.events.add('createPlayerHud', (playerName) => {
    mp.players.local.nametag = playerName;
});

mp.events.add('render', () => {
    mp.players.forEachInStreamRange(player => {
        if (player.nametag !== undefined) {
            const pos = player.getBoneCoords(12844, 0, 0, 0);
            const screenPos = mp.game.graphics.world3dToScreen2d(pos);

            if (screenPos) {
                const baseX = screenPos.x;
                const baseY = screenPos.y - 0.07;

                mp.game.graphics.drawText(player.nametag, [baseX, screenPos.y - 0.1], {
                    font: 4,
                    color: [255, 255, 255, 255],
                    scale: [0.4, 0.4],
                    outline: true
                });
            }
        }
    });
});

// VEHICLE DAMAGE

setInterval(() => {
    mp.vehicles.forEach((vehicle) => {
        const bodyHealth = vehicle.getBodyHealth();
        if (bodyHealth < 400) {
            vehicle.setEngineHealth(0);
        }
    });
}, 1000);

mp.events.add('playerStartEnterVehicle', (vehicle, seat) => { 
    if (!vehicle.getIsEngineRunning()) {
        vehicle.setEngineOn(false, false, true);
    }
});

let dmvLabel = mp.labels.new("Foloseste ~y~comanda exam ~w~pentru a incepe testul\nteoretic", new mp.Vector3(638.3355102539062,1.6916004419326782,82.78642272949219),
    {
        los: false,
        font: 2,
        drawDistance: 5,
    });