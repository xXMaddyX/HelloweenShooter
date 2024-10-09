import Phaser from "phaser";
import { EnemySmalPumpkin0, EnemySmalPumpkin1, EnemySmalPumpkin2, } from "../../assetLoader/AssetLoader";

const KEYS = {
    KEY_PUMPKIN0: "BigPumpkin0",
    KEY_PUMPKIN1: "BigPumpkin1",
    KEY_PUMPKIN2: "BigPumpkin2"
}

export default class BigEnemyPumpkin {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
        this.PumpkinPositions = [
            {x: 300, y: 950, depth: 11, scale: 0.35, body: {width: 270, height: 200, center: true}, offset: {x: 230, y:210}},
            {x: 1000, y: 1000, depth: 11, scale: 0.35, body: {width: 270, height: 200, center: true}, offset: {x: 230, y: 210}},
            {x: 350, y: 750, depth: 8, scale: 0.35, body: {width: 270, height: 200, center: true}, offset: {x: 230, y: 210}},
            {x: 750, y: 800, depth: 11, scale: 0.35, body: {width: 270, height: 200, center: true}, offset: {x: 230, y: 210}},
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
            key: "bigPumpkinAnim",
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
        this.Pumpkin.anims.play("bigPumpkinAnim");
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