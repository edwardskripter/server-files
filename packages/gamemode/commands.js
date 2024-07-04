mp.events.addCommand('setmoney', (player, num) => {
    if(!num || isNaN(num)) return player.outputChatBox(`${player.data.money}`);
    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [num, player.name], function(err, res){
        if(!err){
            player.data.money = num;
            player.outputChatBox("Money Updated");
            player.call("updateHud", [player.name, mp.players.length, player.data.money, player.data.bankmoney]);
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('sethealth', (player, health) => {
    if(!health || isNaN(health)) return player.outputChatBox('SYNTAX: /sethealth [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET health = ? WHERE username = ?', [health, player.name], function(err, res){
        if(!err){
            player.health = parseInt(health);
            player.outputChatBox("Health Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('setarmour', (player, armour) => {
    if(!armour || isNaN(armour)) return player.outputChatBox('SYNTAX: /setarmour [amount]');
    gm.mysql.handle.query('UPDATE `accounts` SET armour = ? WHERE username = ?', [armour, player.name], function(err, res){
        if(!err){
            player.armour = parseInt(armour);
            player.outputChatBox("Armour Updated");
        } else {
            console.log(err)
        }
    });
});

mp.events.addCommand('stats', (player) => {
    player.outputChatBox(`Money: ${player.data.money} X: ${player.position.x.toFixed(2)} Y: ${player.position.y.toFixed(2)} Z: ${player.position.z.toFixed(2)}`);
});

function getPlayerByName(name) {
    let targetPlayer = null;
    mp.players.forEach(p => {
        if (p.name === name) {
            targetPlayer = p;
        }
    });

    return targetPlayer;
}

mp.events.addCommand("discord", (player) => {
    player.outputChatBox("Discord-ul server-ului este: discord.gg/linkmania");
});

mp.events.addCommand("clearchat", (player) => {
    if(player.data.admin < 5) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    for (let i = 0; i < 20; i++) {
        mp.players.broadcast('  ');
    }
    mp.players.broadcast(`Adminul ${player.name} a sters chat-ul!`);
});

mp.events.addCommand("veh", (player, arg) => {
    if (player.data.admin >= 1) {
         if (!arg) {
            player.outputChatBox("/veh [name]");
            return;
        }
        
        const position = player.position;
        const vehicle = mp.vehicles.new(mp.joaat(arg), position);
        
        if (vehicle) {
            player.putIntoVehicle(vehicle, 0);
            player.outputChatBox(`Ai spawnat ${arg}!`);
        }
    } else {
        player.outputChatBox("Nu ai acces la aceasta comanda");
    }
});

mp.events.addCommand("nc", (player) => {
    if(player.data.admin < 0) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    player.call("noclip");
});

mp.events.addCommand("setadmin", (player, name, level) => {
    if (player.data.accountData.admin >= 6) {
        if (!name || !level) {
            player.outputChatBox("/setadmin [name] [level]");
            return;
        }
        
        name = name.trim();
        
        name = name.replace(/[^\w\s]/gi, '');
        
        if (getPlayerByName(name)) {
            player.outputChatBox(`Ai dat admin level ${level} lui ${name}`);
            targetPlayer.outputChatBox(`Ai primit admin level ${level} de la ${player.name}`);
            targetPlayer.admin(parseInt(level));
        } else {
            player.outputChatBox(`Player-ul ${name} nu a fost găsit.`);
        }
    } else {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
    }
});

mp.events.addCommand("weapon", (player, weapon, ammo) => {
    if(player.data.admin < 5) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    let weaponHash = mp.joaat(weapon);
    player.giveWeapon(weaponHash, parseInt(ammo) || 10000);
});

mp.events.addCommand('tptocoords', (player, x, y, z) => {
    if(player.data.admin < 5) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    if (x && y && z) {
        player.position = new mp.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    } else {
        player.outputChatBox("Usage: /tptocoords [x] [y] [z]");
    }
});

mp.events.addCommand("pos", (player, _, targetName) => {
    if(player.data.admin < 5) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    if (!targetName) {
        player.outputChatBox('Utilizare: /pos [USERNAME]');
        return;
    }

    if (getPlayerByName(targetName)) {
        player.outputChatBox(JSON.stringify(player.position));
        console.log(`Coords ${targetName} sunt ${player.position}`)
    } else {
        player.outputChatBox(`Nu s-a găsit niciun jucător cu numele ${targetName}.`);
    }
});

// KILL COMMAND

mp.events.addCommand('kill', (player, _, targetName) => {
    if(player.data.admin < 6) {
        player.outputChatBox("Nu ai acces la aceasta comanda!");
        return;
    }
    if (!targetName) {
        player.outputChatBox('Utilizare: /kill [USERNAME]');
        return;
    }

    if (getPlayerByName(targetName)) {
        getPlayerByName(targetName).health = 0; 
        mp.players.broadcast(`Jucătorul ${targetName} a fost omorat de ${player.name}.`);
    } else {
        player.outputChatBox(`Nu s-a găsit niciun jucător cu numele ${targetName}.`);
    }
});

mp.events.addCommand("bank", ( player ) => {
    let bank_transactions = []
    let select_query = `SELECT * FROM bank_transactions WHERE from_player = '${player.name}'`
    gm.mysql.handle.query(select_query, function (err, res) {
        console.log(err, res)
        if (!err) {
            res.forEach(row => {
                bank_transactions.push({
                    from_player: row.from_player,
                    to_player: row.to_player,
                    amount: row.amount,
                    timestamp: row.timestamp
                });
            });
        }
        console.log(player.data.money, player.data.bankmoney, player.name, bank_transactions);
        player.call("openBank", [ player.data.money, player.data.bankmoney, player.name, bank_transactions]);
    })
});

mp.events.add("depositBank", ( player, amm ) => {
    amm = parseInt(amm);

    if ( amm > player.data.money) {
        return;
    }
    player.data.money = player.data.money - amm;
    player.data.bankmoney = player.data.bankmoney + amm;

    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [player.data.money, player.name], function(err, res){
        if(!err){
            gm.mysql.handle.query('UPDATE `accounts` SET BankMoney = ? WHERE username = ?', [player.data.bankmoney, player.name], function(err, res){
                if(!err){
                    player.call("updateHud", [player.name, mp.players.length, player.data.money, player.data.bankmoney]);
                    gm.mysql.handle.query(`INSERT INTO bank_transactions (from_player, to_player, amount) VALUES ('${player.name}', 'deposit', ${amm});`, [player.data.bankmoney, player.name]);
                }
            });
        }
    });
});

mp.events.add("extrageBank", ( player, amm ) => {
    amm = parseInt(amm);

    if ( amm > player.data.bankmoney) {
        return;
    }
    player.data.bankmoney = player.data.bankmoney - amm;
    player.data.money = player.data.money + amm;

    gm.mysql.handle.query('UPDATE `accounts` SET money = ? WHERE username = ?', [player.data.money, player.name], function(err, res){
        if(!err){
            gm.mysql.handle.query('UPDATE `accounts` SET BankMoney = ? WHERE username = ?', [player.data.bankmoney, player.name], function(err, res){
                if(!err){
                    player.call("updateHud", [player.name, mp.players.length, player.data.money, player.data.bankmoney]);
                    gm.mysql.handle.query(`INSERT INTO bank_transactions (from_player, to_player, amount) VALUES ('${player.name}', 'extrage', ${amm});`, [player.data.bankmoney, player.name]);
                }
            });
        }
    });
});

mp.events.add("TransferBank", ( player, amm, targetName ) => {
    amm = parseInt(amm);

    if ( amm > player.data.bankmoney) {
        return;
    }
    
    let target_player = getPlayerByName(targetName)

    if (target_player) {
        player.data.bankmoney = player.data.bankmoney - amm;
        target_player.data.bankmoney = target_player.data.bankmoney + amm;

        gm.mysql.handle.query('UPDATE `accounts` SET BankMoney = ? WHERE username = ?', [player.data.bankmoney, player.name], function(err, res){
            if(!err){
                gm.mysql.handle.query('UPDATE `accounts` SET BankMoney = ? WHERE username = ?', [player.data.bankmoney, targetName], function(err, res){
                    if(!err){
                        player.call("updateHud", [player.name, mp.players.length, player.data.money, player.data.bankmoney]);
                        target_player.call("updateHud", [target_player.name, mp.players.length, target_player.data.money, target_player.data.bankmoney]);
                    }
                });
            }
            gm.mysql.handle.query(`INSERT INTO bank_transactions (from_player, to_player, amount) VALUES ('${player.name}', '${target_player}', ${amm});`);
        });

    } else {
        player.outputChatBox(`Nu s-a găsit niciun jucător cu numele ${targetName}.`);
    }
});

mp.events.addCommand('q', ( player ) => {
    player.kick('You left the server');
});     