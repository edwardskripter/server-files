let lvlbar;

mp.events.add("updateBar", ( level, xp ) => {

    if (!lvlbar) {
        lvlbar = mp.browsers.new("package://levels/index.html");
    }

    function calculateXP(level, initialXP) {
        if (level === 1) {
            return 100;
        } else {
            return calculateXP(level - 1, initialXP) + (50 + 0.1 * calculateXP(level - 1, initialXP));
        }
    }

    next_level_xp = calculateXP(level + 1, xp)
    current_level_xp = calculateXP(level, xp)

    parity_per_xp = 100 / (next_level_xp - current_level_xp)

    lvlbar.execute(`$("#level").text(${level});`)
    lvlbar.execute(`$("#xp").text(${xp});`)    

    let progressBarHTML = `$("#progressbar").progressbar({
        value: Math.floor((${xp} - ${current_level_xp}) * ${parity_per_xp})
    });`

    lvlbar.execute(progressBarHTML)

}); 