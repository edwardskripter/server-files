let textui;

mp.events.add("showTextUI", ( key, text ) => {
    if (!textui) {
        textui = mp.browsers.new("package://textui/index.html");
    } else if(textui) {
        textui.execute(`$('.container').fadeIn(300);`);
    }
    
    textui.execute(`$('.key').text('${key}');`);
    textui.execute(`$('.text').text('${text}');`);
});

mp.events.add("hideTextUI", () => {
    if (textui) {
        textui.execute(`$('.container').fadeOut(300);`);
    } else {
        return;
    }
});