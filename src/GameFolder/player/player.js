import Phaser from "phaser";
import { CrossHair } from "../assetLoader/AssetLoader";

const KEYS = {
    KEY_CROSS_HAIR: "CrossHair",
}

export default class Player {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
    };

    //MAKE STATIC LATER!!!!!!!!!!!!
    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_CROSS_HAIR, CrossHair);
    };

    //MAKE STATIC LATER!!!!!!!!!!!!
    initAnimations() {

    };

    create() {
        this.playerCross = this.scene.physics.add.sprite(0 ,0 ,KEYS.KEY_CROSS_HAIR);
        this.playerCross.depth = 12
        this.playerCross.scale = 0.25
        this.playerCross.setBodySize(130, 130, true)
        this.scene.input.mouse.manager.canvas.style.cursor = "none";
    };

    crossHandler() {
        this.playerCross.x = this.scene.game.input.mousePointer.x
        this.playerCross.y = this.scene.game.input.mousePointer.y
    }

    update(time, delta) {
        this.crossHandler()
    };
};