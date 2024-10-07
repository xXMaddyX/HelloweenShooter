import Phaser from "phaser";
import { EnemySmalPumpkin0, EnemySmalPumpkin1, EnemySmalPumpkin2 } from "../../assetLoader/AssetLoader";

const KEYS = {
    KEY_PUMPKIN0: "SmalPumpkin0",
    KEY_PUMPKIN1: "SmalPumpkin1",
    KEY_PUMPKIN2: "SmalPumpkin2"
}

export default class SmalEnemyPumpkin {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
        this.PumpkinPositions = [
            {x: 630, y: 240, depth: 8, scale: 0.25},
            {x: 1480, y: 800, depth: 5, scale: 0.25},
            {x: 100, y: 750, depth: 5, scale: 0.25},
            {x: 280, y:180, depth: 5, scale: 0.25},
            {x: 600, y: 480, depth: 8, scale: 0.25},
            {x: 1300, y: 470, depth: 8, scale: 0.25},
        ]
        this.actualPositionIndex = 0
        this.inReset = false
        this.isDestroyed = false
    }

    static loadSprites(scene) {
        if (!scene.textures.exists(KEYS.KEY_PUMPKIN0)) scene.load.image(KEYS.KEY_PUMPKIN0, EnemySmalPumpkin0);
        if (!scene.textures.exists(KEYS.KEY_PUMPKIN1)) scene.load.image(KEYS.KEY_PUMPKIN1, EnemySmalPumpkin1);
        if (!scene.textures.exists(KEYS.KEY_PUMPKIN2)) scene.load.image(KEYS.KEY_PUMPKIN2, EnemySmalPumpkin2);
    }

    initAnimations() {
        this.deadAnim = this.scene.anims.create({
            key: "smalPumpkinAnim",
            frames: [
                { key: KEYS.KEY_PUMPKIN0 },
                { key: KEYS.KEY_PUMPKIN1 },
                { key: KEYS.KEY_PUMPKIN2 }
            ],
            frameRate: 3,
            repeat: 0
        })
    }

    create() {
        this.initAnimations()
        this.Pumpkin = this.scene.physics.add.sprite(this.PumpkinPositions[0].x, this.PumpkinPositions[0].y, KEYS.KEY_PUMPKIN0);
        this.Pumpkin.depth = this.PumpkinPositions[0].depth
        this.Pumpkin.scale = this.PumpkinPositions[0].scale
    }

    pumpkinDead() {
        this.Pumpkin.anims.play("smalPumpkinAnim");
        this.isDestroyed = true
    }

    resetPumkin(x, y, depth, scale) {
        this.Pumpkin.x = x;
        this.Pumpkin.y = y;
        this.Pumpkin.depth = depth;
        this.Pumpkin.scale = scale;
        this.Pumpkin.visible = true
        this.Pumpkin.anims.setCurrentFrame(this.Pumpkin.anims.currentAnim.frames[0])
        this.isDestroyed = false
    }

    checkFrame() {
        let frame = this.Pumpkin.anims.currentFrame.index
        if (frame === 3 && !this.inReset) {
            this.inReset = true
            /*this.actualPositionIndex++
            if (this.actualPositionIndex >= this.PumpkinPositions.length) {
                this.actualPositionIndex = 0
            }*/
            let randoomNum = Math.floor(Math.random() * this.PumpkinPositions.length);
            let {x, y, depth, scale} = this.PumpkinPositions[randoomNum]
            this.Pumpkin.anims.stop()
            this.scene.time.delayedCall(3000, () => {
                this.Pumpkin.visible = false
                this.resetPumkin(x, y, depth, scale)
                this.inReset = false
            })
        }
    }

    update(time, delta) {
        if (this.Pumpkin.anims.isPlaying) {
            this.checkFrame()
        }
    }
}