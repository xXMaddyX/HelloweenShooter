import Phaser from "phaser";

import { Plus25Points } from '../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_PLUS25POINTS: "Plus25Points",
};

export default class Plus25PointsClass {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.basicPositionX = -100;
        this.basicPositionY = -100;
        this.isActive = false;
        this.timer = 3;

    };

    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_PLUS25POINTS, Plus25Points);
    }

    create() {
        this.Points25 = this.scene.add.sprite(-100, -100, KEYS.KEY_PLUS25POINTS);
        this.Points25.scale = 0.13;
        this.Points25.depth = 12;
        this.Points25.visible = false
    };

    setActive(x, y) {
        this.setPosition(x, y);
        this.Points25.visible = true;
        this.isActive = true;
    };

    setPosition(x, y) {
        this.Points25.x = x + 50;
        this.Points25.y = y - 50;
    };

    setBackToDefault() {
        this.Points25.x = this.basicPositionX;
        this.Points25.y = this.basicPositionY;
        this.Points25.alpha = 1
        this.isActive = false;
        this.Points25.visible = false;
        this.timer = 3;
    };

    timing(delta) {
        this.timer -= delta / 1000;
        if (this.timer < 0) {
            this.setBackToDefault();
        };
    };

    moveAnim(delta) {
        this.Points25.y -= delta / 50
        this.Points25.alpha -= delta / 3000
    }

    update(time, delta) {
        if (this.isActive) {
            this.timing(delta);
            this.moveAnim(delta);
        };
    };
};