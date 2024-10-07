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
            {x: 280, y:180, depth: 5, scale: 0.25, body: {width: 240, height: 200, center: true}, offset: {x: 240, y: 200}},
            {x: 1300, y: 470, depth: 8, scale: 0.25, body: {width: 200, height: 130, center: true}, offset: null},
            {x: 600, y: 480, depth: 8, scale: 0.25, body: {width: 200, height: 200, center: true}, offset: null},
            {x: 100, y: 750, depth: 5, scale: 0.25, body: {width: 200, height: 200, center: true}, offset: null},
            {x: 1480, y: 800, depth: 5, scale: 0.25, body: {width: 200, height: 200, center: true}, offset: {x: 300, y: 200}},
            {x: 630, y: 240, depth: 8, scale: 0.25, body: {width: 200, height: 200, center: true}, offset: null},
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
        this.Pumpkin.anims.play("smalPumpkinAnim");
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
            /*this.actualPositionIndex++
            if (this.actualPositionIndex >= this.PumpkinPositions.length) {
                this.actualPositionIndex = 0
            }*/
            let randoomNum = Math.floor(Math.random() * this.PumpkinPositions.length);
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