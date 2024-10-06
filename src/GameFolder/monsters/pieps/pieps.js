import Phaser from "phaser";

import {
    MadPieps,
    Minus50Points
} from '../../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_MAD_PIEPS: "MadPieps",
    KEY_MINUS_POINTS: "MinusPoints",
}

const piepsPositions = [
    {x: 215, y: 600, scale: 1},
    {x: 1530, y: 600, scale: -1},
    {x: 435, y: 600, scale: 1},
    {x: 1400, y: 100, scale: -1},
]

export default class Pieps {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.isMovingUp = true;
        this.isMovingDown = false;
        this.isActualPosSet = false;
        this.isNewPosition = false;
        this.positionIndex = 0;
        this.actualX = 0;
        this.actualY = 0;
    }

    static loadSprites(scene) {
        if (!scene.textures.exists(KEYS.KEY_MAD_PIEPS)) scene.load.image(KEYS.KEY_MAD_PIEPS, MadPieps);
        if (!scene.textures.exists(KEYS.KEY_MINUS_POINTS)) scene.load.image(KEYS.KEY_MINUS_POINTS, Minus50Points);
    }

    create() {
        this.pieps = this.scene.add.sprite(0, 0, KEYS.KEY_MAD_PIEPS);
        this.pieps.scale = 1;
        this.pieps.depth = 8;
    }

    setPiepsPosition(x, y, scale) {
        this.pieps.x = x;
        this.pieps.y = y;
        this.pieps.scaleX = scale;
        this.actualX = this.pieps.x;
        this.actualY = this.pieps.y;
        this.isActualPosSet = true;
        this.isNewPosition = true;
    }

    movePieps(delta) {
        if (this.isActualPosSet && this.isNewPosition) {
            if (this.isMovingUp) {
                this.pieps.y -= 1;
                if (this.pieps.y <= this.actualY - 120) {
                    this.isMovingUp = false;
                    this.isMovingDown = true;
                }
            }

            if (this.isMovingDown) {
                this.pieps.y += 1;
                if (this.pieps.y >= this.actualY + 50) {
                    this.isMovingDown = false;
                    this.isMovingUp = true;
                    this.isNewPosition = false;
                }
            }
        }
    }

    update(time, delta) {
        if (!this.isNewPosition) {
            /*if (this.positionIndex >= piepsPositions.length) {
                this.positionIndex = 0;
            }*/
            let randoomNum = Math.floor(Math.random() * 4);
            let addPosition = piepsPositions[randoomNum];
            this.setPiepsPosition(addPosition.x, addPosition.y, addPosition.scale);
            this.positionIndex++;
        }
        this.movePieps(delta);
    }
}
