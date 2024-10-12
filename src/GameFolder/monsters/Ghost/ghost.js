import Phaser from "phaser";

import { GhostSprite } from '../../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_GHOSTSPRITE: "Ghost",
};

export default class Ghost {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.isMovingRight = true;
        this.isVisible = false;
        this.isActive = false;
        this.delaytoShowisActive = true;
        this.delayToShow = 0;
        this.defaultDelayToShow = 0;
        this.defaultShowTimer = 0;
        this.showTimer = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.moveRange = 0;
    };

    resetGhostOnDead() {
        this.isActive = false;
        this.isVisible = false;
        this.showTimer = this.defaultShowTimer;
        this.delayToShow = this.defaultDelayToShow;
    };

    setCurrentXY(x, y) {
        this.currentX = x;
        this.currentY = y;
    };

    static loadSprite(scene) {
        scene.load.image(KEYS.KEY_GHOSTSPRITE, GhostSprite);
    };

    create(x, y, config) {
        this.Ghost = this.scene.physics.add.sprite(x, y, KEYS.KEY_GHOSTSPRITE);
        const {range, timeToShow, visibleTime} = config;
        this.Ghost.scale = 0.25;
        this.Ghost.depth = 11;
        this.Ghost.alpha = 0;
        this.moveRange = range;
        this.defaultDelayToShow = timeToShow;
        this.defaultShowTimer = visibleTime;
        this.delayToShow =  this.defaultDelayToShow;
        this.showTimer = this.defaultShowTimer;
        this.setCurrentXY(this.Ghost.x, this.Ghost.y);
    };

    movementHandler() {
        if (this.isMovingRight) {
            this.Ghost.x += 1;
        } else {
            this.Ghost.x -= 1;
        };
    };

    checkPosition() {
        if (this.Ghost.x >= this.currentX + this.moveRange) {
            this.isMovingRight = false;
        };
        if (this.Ghost.x <= this.currentX - this.moveRange) {
            this.isMovingRight = true;
        };
    };

    visibleHandler(delta) {
        if (this.Ghost.alpha < 1) {
            this.Ghost.alpha += 0.01;
        }
        if (this.Ghost.alpha >= 1) {
            this.Ghost.alpha = 1;
            this.isVisible = true;
        };
    };

    hideHandler() {
        if (this.Ghost.alpha > 0) {
            this.Ghost.alpha -= 0.01;
        };
        if (this.Ghost.alpha <= 0) {
            this.Ghost.alpha = 0;
            this.isVisible = false;
        };
    };

    toShowTimerHandler(delta) {
        this.delayToShow -= delta / 1000;
        if (this.delayToShow < 0) {
            this.isActive = true;
            this.delayToShow = this.defaultDelayToShow;
        };
    };

    visibleTimer(delta) {
        this.showTimer -= delta / 1000;
        if (this.showTimer < 0) {
            this.isActive = false;
            this.showTimer = this.defaultShowTimer;
        };
    };

    update(time, delta) {
        this.checkPosition();
        this.movementHandler();
        if (!this.isActive) {
            this.toShowTimerHandler(delta);
        };
        if (this.isActive) {
            this.movementHandler();
            if (!this.isVisible) {
                this.visibleHandler(delta);
            };
            if (this.isVisible) {
                this.visibleTimer(delta);
            };
        }
        if (!this.isActive) {
            this.hideHandler();
        };
    };
};