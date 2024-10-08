import Phaser from "phaser";

import { 
    FunnySpider0, 
    FunnySpider1, 
    FunnySpider2, 
    FunnySpider3, 
    FunnySpider4, 
    FunnySpider5 
} from '../../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_SPIDER0: "Spider0",
    KEY_SPIDER1: "Spider1",
    KEY_SPIDER2: "Spider2",
    KEY_SPIDER3: "Spider3",
    KEY_SPIDER4: "Spider4",
    KEY_SPIDER5: "Spider5",
};

export default class FunnySpiderClass {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene
    }

    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_SPIDER0, FunnySpider0);
        scene.load.image(KEYS.KEY_SPIDER1, FunnySpider1);
        scene.load.image(KEYS.KEY_SPIDER2, FunnySpider2);
        scene.load.image(KEYS.KEY_SPIDER3, FunnySpider3);
        scene.load.image(KEYS.KEY_SPIDER4, FunnySpider4);
        scene.load.image(KEYS.KEY_SPIDER5, FunnySpider5);
    }

    static initAnims(scene) {
        scene.anims.create({
            key: "spiderAnim",
            frames: [
                { key: KEYS.KEY_SPIDER0 },
                { key: KEYS.KEY_SPIDER1 },
                { key: KEYS.KEY_SPIDER2 },
                { key: KEYS.KEY_SPIDER3 },
                { key: KEYS.KEY_SPIDER4 },
                { key: KEYS.KEY_SPIDER5 }
            ],
            frameRate: 10,
            repeat: -1
        });
    };

    create() {
        this.spider = this.scene.add.sprite(575, 320, KEYS.KEY_SPIDER0);
        this.spider.scale = 0.040
        this.spider.depth = 11;
        this.spider.play("spiderAnim");
    };
};