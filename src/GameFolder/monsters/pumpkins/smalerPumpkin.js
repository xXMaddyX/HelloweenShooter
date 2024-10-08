import Phaser from "phaser";
import { EnemySmalPumpkin0, EnemySmalPumpkin1, EnemySmalPumpkin2 } from "../../assetLoader/AssetLoader";

const KEYS = {
    KEY_PUMPKIN0: "SmalerPumpkin0",
    KEY_PUMPKIN1: "SmalerPumpkin1",
    KEY_PUMPKIN2: "SmalerPumpkin2"
}

export default class SmalerEnemyPumpkin {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
        this.PumpkinPositions = [
            {x: 1330, y: 340, depth: 11, scale: 0.15, body: {width: 200, height: 200, center: true}, offset: null},
            {x: 905, y: 440, depth: 8, scale: 0.15, body: {width: 200, height: 200, center: true}, offset: {x: 300, y: 150}},
            {x: 700, y: 120, depth: 5, scale: 0.15, body: {width: 200, height: 200, center: true}, offset: null},
            {x: 628, y:355, depth: 11, scale: 0.15, body: {width: 240, height: 200, center: true}, offset: {x: 240, y: 200}},
            {x: 140, y: 980, depth: 11, scale: 0.15, body: {width: 240, height: 200, center: true}, offset: {x: 240, y: 210}},
            {x: 450, y: 420, depth: 5, scale: 0.15, body: {width: 200, height: 200, center: true}, offset: null},
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
            key: "smalerPumpkinAnim",
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
        let { x, y, depth, scale, body, offset } = this.PumpkinPositions[0]
        this.Pumpkin = this.scene.physics.add.sprite(x, y, KEYS.KEY_PUMPKIN0);
        this.Pumpkin.depth = depth;
        this.Pumpkin.scale = scale;
        this.Pumpkin.setBodySize(body.width, body.height, body.center)
        if (offset != null) {
            this.Pumpkin.setOffset(offset.x, offset.y)
        }
        
    }

    pumpkinDead() {
        this.Pumpkin.anims.play("smalerPumpkinAnim");
        this.isDestroyed = true
    }

    resetPumkin(x, y, depth, scale, body, offset) {
        this.Pumpkin.x = x;
        this.Pumpkin.y = y;
        this.Pumpkin.depth = depth;
        this.Pumpkin.scale = scale;
        this.Pumpkin.visible = true
        this.Pumpkin.setBodySize(body.width, body.height, body.center)
        if (offset != null) {
            this.Pumpkin.setOffset(offset.x, offset.y)
        }
        this.Pumpkin.anims.setCurrentFrame(this.Pumpkin.anims.currentAnim.frames[0])
        this.isDestroyed = false
    }

    checkFrame() {
        let frame = this.Pumpkin.anims.currentFrame.index
        if (frame === 3 && !this.inReset) {
            this.inReset = true
            let randoomNum = Math.floor(Math.random() * this.PumpkinPositions.length);
            if (this.actualPositionIndex === randoomNum) {
                if (randoomNum + 1 >= this.PumpkinPositions.length) {
                    randoomNum = 0
                } else {
                    randoomNum += 1
                }
            }
            this.actualPositionIndex = randoomNum
            let {x, y, depth, scale, body, offset} = this.PumpkinPositions[randoomNum]
            this.Pumpkin.anims.stop()
            this.scene.time.delayedCall(3000, () => {
                this.Pumpkin.visible = false
                this.resetPumkin(x, y, depth, scale, body, offset)
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