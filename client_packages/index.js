require('login.js');
require('./loginsys/login/app.js');
require('./bank/assets/js/app');
require('./base/blips.js');
require('./admin/noclip.js');
require('./anticheat/index.js');
require('./hud/interface.js');
require('./levels/index.js');
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

mp.events.call('setDiscordStatus', 'Quantum Studios', `Online: ${mp.players.length}`);


mp.events.add("render", () => {
    let playerCount = mp.players.length;
    let text = `LinkMania RPG | Total Players: ${playerCount}`;
    let textPos = [0.5, 0.005];
    let scale = [0.5, 0.5];

    let textWidth = text.length * 0.005; 
    let textHeight = 0.035;

    mp.game.graphics.drawRect(
        textPos[0],
        textPos[1] + 0.0175, 
        textWidth + 0.015, 
        textHeight, 
        0, 0, 0, 150 
    );

    mp.game.graphics.drawText(text, textPos, {
        font: 4,
        color: [255, 255, 255, 185],
        scale: scale,
        outline: true
    });
});

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