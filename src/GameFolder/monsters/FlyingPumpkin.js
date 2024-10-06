import Phaser from "phaser";

import { 
    pump0,
    pump1,
    pump2,
    pump3,
    pump4,
    pump5,
    pump6,
    pump7,
    pump8,
    pump9,
    pump10,
    pump11,
    pump12,
    pump13,
    pump14,
    pump15,
    pump16,
    pump17,
    pump18,
    pump19,
    pump20,
    pump21,
    pump22,
    pump23,
    pump24,
    pump25,
    pump26,
    pump27,
    pump28,
    pump29,
    pump30,
    pump31,
    pump32,
    pump33,
    pump34,
    pump35,
    pump36,
    pump37,
    pump38,
    pump39,
    pump40,
    pump41,
    pump42
 } from '../monsters/FlyingPumpkinConfig.js'


export default class FlyingPumpkin {
    constructor(scene) {
        /** @type {Phaser.Scene} */
        this.scene = scene;
    }

    static loadSprites(scene) {
        scene.load.image("pump0", pump0);
        scene.load.image("pump1", pump1);
        scene.load.image("pump2", pump2);
        scene.load.image("pump3", pump3);
        scene.load.image("pump4", pump4);
        scene.load.image("pump5", pump5);
        scene.load.image("pump6", pump6);
        scene.load.image("pump7", pump7);
        scene.load.image("pump8", pump8);
        scene.load.image("pump9", pump9);
        scene.load.image("pump10", pump10);
        scene.load.image("pump11", pump11);
        scene.load.image("pump12", pump12);
        scene.load.image("pump13", pump13);
        scene.load.image("pump14", pump14);
        scene.load.image("pump15", pump15);
        scene.load.image("pump16", pump16);
        scene.load.image("pump17", pump17);
        scene.load.image("pump18", pump18);
        scene.load.image("pump19", pump19);
        scene.load.image("pump20", pump20);
        scene.load.image("pump21", pump21);
        scene.load.image("pump22", pump22);
        scene.load.image("pump23", pump23);
        scene.load.image("pump24", pump24);
        scene.load.image("pump25", pump25);
        scene.load.image("pump26", pump26);
        scene.load.image("pump27", pump27);
        scene.load.image("pump28", pump28);
        scene.load.image("pump29", pump29);
        scene.load.image("pump30", pump30);
        scene.load.image("pump31", pump31);
        scene.load.image("pump32", pump32);
        scene.load.image("pump33", pump33);
        scene.load.image("pump34", pump34);
        scene.load.image("pump35", pump35);
        scene.load.image("pump36", pump36);
        scene.load.image("pump37", pump37);
        scene.load.image("pump38", pump38);
        scene.load.image("pump39", pump39);
        scene.load.image("pump40", pump40);
        scene.load.image("pump41", pump41);
        scene.load.image("pump42", pump42);
    }

    static initAnimations(scene) {
        scene.anims.create({
            key: "flyingPumpkin",
            frames: [
                { key: "pump0" },
                { key: "pump1" },
                { key: "pump2" },
                { key: "pump3" },
                { key: "pump4" },
                { key: "pump5" },
                { key: "pump6" },
                { key: "pump7" },
                { key: "pump8" },
                { key: "pump9" },
                { key: "pump10" },
                { key: "pump11" },
                { key: "pump12" },
                { key: "pump13" },
                { key: "pump14" },
                { key: "pump15" },
                { key: "pump16" },
                { key: "pump17" },
                { key: "pump18" },
                { key: "pump19" },
                { key: "pump20" },
                { key: "pump21" },
                { key: "pump22" },
                { key: "pump23" },
                { key: "pump24" },
                { key: "pump25" },
                { key: "pump26" },
                { key: "pump27" },
                { key: "pump28" },
                { key: "pump29" },
                { key: "pump30" },
                { key: "pump31" },
                { key: "pump32" },
                { key: "pump33" },
                { key: "pump34" },
                { key: "pump35" },
                { key: "pump36" },
                { key: "pump37" },
                { key: "pump38" },
                { key: "pump39" },
                { key: "pump40" },
                { key: "pump41" },
                { key: "pump42" }
            ],
            frameRate: 20,
            repeat: -1,
        });
    }

    create() {
        this.pump1 = this.scene.add.sprite(230, 550, "FlyingKrbs0").play("flyingPumpkin");
        this.pump1.scale = 0.5
        this.pump1.depth = 11

        this.scene.time.delayedCall(5000, () => {
            this.pump2 = this.scene.add.sprite(1670, 800, "FlyingKrbs0").play("flyingPumpkin");
            this.pump2.scale = 0.5
            this.pump2.depth = 11
        })
    }

    update() {
        // Update-Logik hier
    }
}

