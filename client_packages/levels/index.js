var ProgressBar = require('progressbar.js');
var bar = new ProgressBar.Line("#line", {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 100,
    svgStyle: {width: '100%', height: '100%', borderRadius: '10px'}
});

let lvlbar;

mp.events.add("updateBar", ( level, xp ) => {

    if (!lvlbar) {
        lvlbar = mp.browsers.new("package://levels/index.html");
    }

    xp = (300*(level-1)/2)+xp;

    barHTML.execute(`$("#level).text(${level});`)
    barHTML.execute(`$("#xp).text(${xp});`)
    bar.animate(`0.${xp}`);
}); 