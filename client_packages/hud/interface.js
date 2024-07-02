let hud;

mp.events.add("updateHud", (name, online, money, bankmoney) => {

    if (!hud) {
        hud = mp.browsers.new("package://hud/index.html");
    }
    
    hud.execute(`$('#userName').text('${name}');`);
    hud.execute(`$('#onlineData').text('${online}');`);
    hud.execute(`$('#cash').text('${money}');`);
    hud.execute(`$('#bank').text('${bankmoney}');`);
});
