const blipLocations = [
    // Gun Shops
    { x: 1693.32, y: 3759.50, z: 34.70, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: 252.63, y: -50.00, z: 69.94, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: 844.15, y: -1033.65, z: 28.19, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: -331.25, y: 6083.54, z: 31.45, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: -662.05, y: -934.36, z: 21.82, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: -1305.48, y: -394.61, z: 36.70, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: -1118.80, y: 2698.22, z: 18.55, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: 2568.83, y: 293.89, z: 108.73, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: -3172.68, y: 1087.10, z: 20.83, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    { x: 21.32, y: -1106.44, z: 29.79, blip: 110, color: 1, scale: 0.8, shortRange: true, name: 'Gun Shop' },
    // 24/7 Stores
    { x: 25.75, y: -1347.50, z: 29.50, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: -3038.93, y: 585.95, z: 7.91, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: -3241.92, y: 1001.46, z: 12.83, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 1728.41, y: 6414.13, z: 35.03, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 1697.88, y: 4924.39, z: 42.06, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 1961.48, y: 3740.63, z: 32.34, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 2678.91, y: 3280.67, z: 55.24, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 2557.45, y: 382.28, z: 108.62, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 1135.80, y: -982.28, z: 46.42, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 547.79, y: 2671.79, z: 42.15, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 1163.37, y: -323.80, z: 69.20, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: -707.50, y: -914.26, z: 19.21, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: -1820.52, y: 792.52, z: 138.12, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    { x: 373.87, y: 325.89, z: 103.56, blip: 52, color: 2, scale: 0.8, shortRange: true, name: '24/7 Supermarket' },
    // POLICE STATIONS
    { x: 427.95, y: -981.05, z: 0, blip: 60, color: 3, scale: 0.8, shortRange: true, name: 'Los Santos Police Station' },
    { x: 1850.65, y: 3683.93, z: 0, blip: 60, color: 3, scale: 0.6, shortRange: true, name: 'Sandy Shores Police Station' },
    { x: -450.66, y: 6014.16, z: 0, blip: 60, color: 3, scale: 0.6, shortRange: true, name: 'Paleto Bay Police Station' },
    // MEDICAL CENTERS 
    { x: 300.56, y: -590.73, z: 0, blip: 80, color: 1, scale: 0.8, shortRange: true, name: 'Pillbox Hill Medical Center' },
    { x: 1829.65, y: 3667.93, z: 34, blip: 80, color: 1, scale: 0.6, shortRange: true, name: 'Sandy Shores Hospital' },
    { x: -248.66, y: 6331.16, z: 32, blip: 80, color: 1, scale: 0.6, shortRange: true, name: 'Paleto Bay Hospital' },
    { x: -874.64, y: -307.27, z: 39.54, blip: 80, color: 1, scale: 0.8, shortRange: true, name: 'Mirror Park Hospital' },
    { x: -247.29, y: 6331.33, z: 32.43, blip: 80, color: 1, scale: 0.8, shortRange: true, name: 'Mount Zonah Hospital' },
    // Barber Shops
    { x: -814.32, y: -183.25, z: 37.56, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: 137.68, y: -1708.04, z: 29.29, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: -33.03, y: -151.42, z: 57.08, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: -1282.32, y: -1116.75, z: 6.99, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: 1931.45, y: 3729.78, z: 32.84, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: 1211.07, y: -472.92, z: 66.21, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: -34.97, y: -151.29, z: 57.08, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    { x: -274.97, y: -6226.29, z: 31.08, blip: 71, color: 17, scale: 0.8, shortRange: true, name: 'Barber Shop' },
    // Tattoo Shops
    { x: -1152.62, y: -1426.74, z: 4.95, blip: 75, color: 17, scale: 0.8, shortRange: true, name: 'Tattoo Shop' },
    { x: 322.38, y: 180.84, z: 103.59, blip: 75, color: 17, scale: 0.8, shortRange: true, name: 'Tattoo Shop' },
    { x: 1322.78, y: -1651.98, z: 52.27, blip: 75, color: 17, scale: 0.8, shortRange: true, name: 'Tattoo Shop' },
    { x: -3170.07, y: 1074.40, z: 20.83, blip: 75, color: 17, scale: 0.8, shortRange: true, name: 'Tattoo Shop' },
    { x: -293.71, y: 6200.32, z: 31.49, blip: 75, color: 17, scale: 0.8, shortRange: true, name: 'Tattoo Shop' },
    // Car Washes
    { x: -699.63, y: -932.26, z: 18.01, blip: 100, color: 3, scale: 0.8, shortRange: true, name: 'Car Wash' },
    { x: 173.90, y: -1736.04, z: 29.22, blip: 100, color: 3, scale: 0.8, shortRange: true, name: 'Car Wash' },
    //  Strip Club
    { x: 127.34, y: -1308.67, z: 29.27, blip: 121, color: 3, scale: 1.0, shortRange: true, name: 'Strip Club' },
    // Clothing Stores
    { x: 1690, y: 2605, z: 45, blip: 188, color: 0, scale: 1.0, shortRange: true, name: 'Police Jail' },
    { x: 72.3, y: -1399.1, z: 28.38, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: -711.4, y: -152.2, z: 37.4, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: -167.9, y: -298.1, z: 39.7, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: 428.7, y: -800.1, z: 29.5, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: -824.1, y: -1073.7, z: 11.3, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: -1193.4, y: -768.1, z: 16.3, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' },
    { x: 11.6, y: 6514.2, z: 31.9, blip: 73, color: 4, scale: 0.8, shortRange: true, name: 'Magazin de Haine' }
];

blipLocations.forEach(location => {
    mp.blips.new(location.blip, new mp.Vector3(location.x, location.y, location.z),
    {
        name: location.name,
        scale: location.scale,
        color: location.color,
        shortRange: location.shortRange,
    });
});

const atmLocations = [
    { x: 147.65, y: -1035.7, z: 29.34, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
    { x: -1212.98, y: -330.84, z: 37.78, blip: 277, color: 2, scale: 0.8, shortRange: true, name: 'ATM' },
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