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
    KEY_PUMPKIN_SONG: "PumpkinSong",

    KEY_GuitarPieps0: "GuitarPieps0",
    KEY_GuitarPieps1: "GuitarPieps1",
    KEY_GuitarPieps2: "GuitarPieps2",
    KEY_GuitarPieps3: "GuitarPieps3",
    KEY_GuitarPieps4: "GuitarPieps4",
    KEY_GuitarPieps5: "GuitarPieps5",
    KEY_GuitarPieps6: "GuitarPieps6",

    KEY_SING_PIEPS0: "SingPieps0",
    KEY_SING_PIEPS1: "SingPieps1",
    KEY_SING_PIEPS2: "SingPieps2",
    KEY_SING_PIEPS3: "SingPieps3",
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