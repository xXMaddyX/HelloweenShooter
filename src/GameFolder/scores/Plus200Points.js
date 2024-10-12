import Phaser from "phaser";

import { Plus200Points } from '../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_PLUS200POINTS: "Plus200Points",
};

export default class Plus200PointsClass {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.basicPositionX = -100;
        this.basicPositionY = -100;
        this.isActive = false;
        this.timer = 3;

    };

    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_PLUS200POINTS, Plus200Points);
    }

    create() {
        this.Points200 = this.scene.add.sprite(-100, -100, KEYS.KEY_PLUS200POINTS);
        this.Points200.scale = 0.13;
        this.Points200.depth = 12;
        this.Points200.visible = false
    };

    setActive(x, y) {
        this.setPosition(x, y);
        this.Points200.visible = true;
        this.isActive = true;
    };

    setPosition(x, y) {
        this.Points200.x = x + 50;
        this.Points200.y = y - 50;
    };

    setBackToDefault() {
        this.Points200.x = this.basicPositionX;
        this.Points200.y = this.basicPositionY;
        this.Points200.alpha = 1
        this.isActive = false;
        this.Points200.visible = false;
        this.timer = 3;
    };

    timing(delta) {
        this.timer -= delta / 1000;
        if (this.timer < 0) {
            this.setBackToDefault();
        };
    };

    moveAnim(delta) {
        this.Points200.y -= delta / 50
        this.Points200.alpha -= delta / 3000
    }

    update(time, delta) {
        if (this.isActive) {
            this.timing(delta);
            this.moveAnim(delta);
        };
    };
};