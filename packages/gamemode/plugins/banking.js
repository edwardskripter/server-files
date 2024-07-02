const atmLocations = [
    { x: 147.65, y: -1035.7, z: 29.34, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -1212.98, y: -330.84, z: 37.78, blip: 277, color: 2, scale: 0.8 , shortRange: true, name: 'ATM' },
    { x: -2962.58, y: 482.627, z: 15.703, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -112.202, y: 6469.295, z: 31.626, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 314.187, y: -278.621, z: 54.170, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -351.534, y: -49.529, z: 49.042, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 1175.06, y: 2706.64, z: 38.094, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -56.933, y: -1752.14, z: 29.421, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 2564.5, y: 2584.79, z: 38.083, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 1703.13, y: 6426.56, z: 32.73, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 89.75, y: 2.35, z: 68.31, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -386.733, y: 6045.953, z: 31.501, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 5.134, y: -919.949, z: 29.557, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 380.85, y: 323.25, z: 103.57, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: 285.37, y: 143.06, z: 104.18, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -333.23, y: -208.87, z: 39.42, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' }
];
atmLocations.forEach(location => {
    mp.blips.new(location.blip, new mp.Vector3(location.x, location.y, location.z), {
        name: location.name,
        scale: location.scale,
        color: location.color,
        shortRange: location.shortRange,
    });
});