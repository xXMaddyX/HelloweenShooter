import Phaser from "phaser";

import { PlusFiftyPoints } from '../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_PLUSFIFTYPOINTS: "Plus50Points",
};

export default class PlusFiftyPointsClass {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.basicPositionX = -100;
        this.basicPositionY = -100;
        this.isActive = false;
        this.timer = 3;

    };

    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_PLUSFIFTYPOINTS, PlusFiftyPoints);
    }

    create() {
        this.Points50 = this.scene.add.sprite(-100, -100, KEYS.KEY_PLUSFIFTYPOINTS);
        this.Points50.scale = 0.5;
        this.Points50.depth = 12;
        this.Points50.visible = false
    };

    setActive(x, y) {
        this.setPosition(x, y);
        this.Points50.visible = true;
        this.isActive = true;
    };

    setPosition(x, y) {
        this.Points50.x = x + 50;
        this.Points50.y = y - 50;
    };

    setBackToDefault() {
        this.Points50.x = this.basicPositionX;
        this.Points50.y = this.basicPositionY;
        this.Points50.alpha = 1
        this.isActive = false;
        this.Points50.visible = false;
        this.timer = 3;
    };

    timing(delta) {
        this.timer -= delta / 1000;
        if (this.timer < 0) {
            this.setBackToDefault();
        };
    };

    moveAnim(delta) {
        this.Points50.y -= delta / 50
        this.Points50.alpha -= delta / 3000
    }

    update(time, delta) {
        if (this.isActive) {
            this.timing(delta);
            this.moveAnim(delta);
        };
    };
};