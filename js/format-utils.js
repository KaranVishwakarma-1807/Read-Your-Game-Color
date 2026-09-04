// Shared Formatting Utilities

// Format Preference Value
function formatPreferenceValue(value) {
    const specialNames = {
        pixelArt: "Pixel Art",
        handDrawn: "Hand-Drawn",
        celShaded: "Cel-Shaded",
        stylized3D: "Stylized 3D",
        realistic: "Realistic",
        lowPoly: "Low Poly",
        minimalist: "Minimalist",
        voxel: "Voxel",
        retro: "Retro",
        colorful: "Colorful",
        dark: "Dark",
        gritty: "Gritty",
        moody: "Moody",
        whimsical: "Whimsical",
        cozy: "Cozy",
        peaceful: "Peaceful",
        surreal: "Surreal",
        atmospheric: "Atmospheric",
        "2d": "2D",
        "2.5d": "2.5D",
        "3d": "3D",
        firstPerson: "First Person",
        thirdPerson: "Third Person",
        topDown: "Top Down",
        isometric: "Isometric",
        sideScroller: "Side Scroller",
        fixedCamera: "Fixed Camera",
        linear: "Linear",
        branching: "Branching",
        hubBased: "Hub Based",
        openWorld: "Open World",
        sandbox: "Sandbox",
        procedural: "Procedural",
        levelBased: "Level Based",
        roguelike: "Roguelike",
        metroidvania: "Metroidvania"
    };

    if (specialNames[value]) {
        return specialNames[value];
    }


    return String(value).replace(/([A-Z])/g, " $1").replace(/^./, character => character.toUpperCase());

}