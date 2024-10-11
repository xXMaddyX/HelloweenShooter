import Phaser from "phaser";

import { GhostSprite } from '../../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_GHOSTSPRITE: "Ghost",
};

export default class Ghost {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.isVisible = false;
        this.isActive = false;
        this.delayToShow = 5;
        this.delaytoShowisActive = true;
        this.showTimer = 5;
        this.currentX = 0;
        this.currentY = 0;
    };

    setCurrentXY(x, y) {
        this.currentX = x;
        this.currentY = y;
    };

    static loadSprite(scene) {
        scene.load.image(KEYS.KEY_GHOSTSPRITE, GhostSprite)
    };

    create(x, y) {
        this.Ghost = this.scene.add.sprite(200, 200, KEYS.KEY_GHOSTSPRITE);
        this.Ghost.scale = 0.25;
        this.Ghost.depth = 11;
        this.Ghost.alpha = 0;
        this.setCurrentXY(this.Ghost.x, this.Ghost.y);
    };

    movementHandler() {

    };

    visibleHandler(delta) {
        if (this.Ghost.alpha < 1) {
            this.Ghost.alpha += 0.01;
        }
        if (this.Ghost.alpha >= 1) {
            this.Ghost.alpha = 1;
            this.isVisible = true
        };
    };

    hideHandler() {
        if (this.Ghost.alpha > 0) {
            this.Ghost.alpha -= 0.01;
        }
        if (this.Ghost.alpha <= 0) {
            this.Ghost.alpha = 0;
            this.isVisible = false;
        }
    }

    toShowTimerHandler(delta) {
        this.delayToShow -= delta / 1000;
        if (this.delayToShow < 0) {
            this.isActive = true;
            this.delayToShow = 5;
        }
    }

    visibleTimer(delta) {
        this.showTimer -= delta / 1000
        if (this.showTimer < 0) {
            this.isActive = false;
            this.showTimer = 5;
        }
    }

    update(time, delta) {
        if (!this.isActive) {
            this.toShowTimerHandler(delta)
            console.log(this.delayToShow)
        };
        if (this.isActive) {
            this.movementHandler();
            if (!this.isVisible) {
                this.visibleHandler(delta);
            }
            if (this.isVisible) {
                this.visibleTimer(delta)
            }
        }
        if (!this.isActive) {
            this.hideHandler();
        }
    };
};