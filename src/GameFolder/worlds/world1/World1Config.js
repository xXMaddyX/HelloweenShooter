const calcBackPositionX = (position) => {
    return position + 960;
};
const calcBackPositionY = (position) => {
    return position + 540;
};

const KEYS = {
    //ADD KEYS FOR SPRITES
    KEY_BACKGROUND: "BackgroundLvL1",
    KEY_BUSH1: "Bush1",
    KEY_BUSH2: "Bush2",
    KEY_BUSH3: "Bush3",
    KEY_BUSH4: "Bush4",
    KEY_BUSH5: "Bush5",
    KEY_HOUSE: "House",
    KEY_DOOR: "Door",
    KEY_WINDOW: "Window",
    KEY_GROUND: "Ground",
    KEY_FELD: "Feld",
    KEY_GRAS: "Gras",
    KEY_MOON: "Moon",
    KEY_SPIDERWEB: "SpiderWeb",
    KEY_BAUM: "Baum",
    KEY_PUMPKINBIG: "PumpKinBig",
    KEY_PUMPKINSMAL: "PumpkinSmal",
    KEY_PUMPKIN_SONG: "PumpkinSong"
};

const World1Config = {
    backgroundPositions: [
        {x: calcBackPositionX(0), y: calcBackPositionY(0), key: KEYS.KEY_BACKGROUND, alpha: 1, depth: 0, scale: 1}
    ],
}


export {
    World1Config,
    KEYS,
    calcBackPositionX,
    calcBackPositionY
}