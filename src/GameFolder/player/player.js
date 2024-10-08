import Phaser from "phaser";
import { CrossHair, PlayerShot} from "../assetLoader/AssetLoader";

const KEYS = {
    KEY_CROSS_HAIR: "CrossHair",
    KEY_SHOT_SOUND: "shotSound"
}

export default class Player {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
        this.isJustFired = false
        this.timer = 1
    };

    //MAKE STATIC LATER!!!!!!!!!!!!
    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_CROSS_HAIR, CrossHair);

        scene.load.audio(KEYS.KEY_SHOT_SOUND, PlayerShot)
    };

    //MAKE STATIC LATER!!!!!!!!!!!!
    initAnimations() {

    };

    create() {
        this.playerCross = this.scene.physics.add.sprite(0 ,0 ,KEYS.KEY_CROSS_HAIR);
        this.playerCross.depth = 21
        this.playerCross.scale = 0.25
        this.playerCross.setBodySize(10, 10, true)
        this.scene.input.mouse.manager.canvas.style.cursor = "none";

        this.shotAudio = this.scene.sound.add(KEYS.KEY_SHOT_SOUND, { volume: 0.5 });
    };

    playShotSound() {
        this.shotAudio.play();
    }

    crossHandler() {
        this.playerCross.x = this.scene.game.input.mousePointer.x
        this.playerCross.y = this.scene.game.input.mousePointer.y
    }

    fireGun() {
        this.isJustFired = true
        this.playShotSound();
    };

    timerHandler(delta) {
        this.timer -= delta / 500
        if (this.timer <= 0) {
            this.timer = 1
            this.isJustFired = false
        }
    }

    update(time, delta) {
        this.crossHandler()
        if (this.isJustFired) {
            this.timerHandler(delta)
        }
        if (this.scene.input.mousePointer.isDown && !this.isJustFired) {
            this.fireGun()
        };
    };
};