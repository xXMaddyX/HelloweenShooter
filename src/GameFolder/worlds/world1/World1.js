import Phaser from "phaser";
import { World1Config, KEYS, calcBackPositionX, calcBackPositionY } from "./World1Config";

import {
    Background,
    Bush1,
    Bush2,
    Bush3,
    Bush4,
    Bush5,
    Baum,
    Ground,
    Gras,
    Feld,
    PumpkinBig,
    PumpkinSmal,
    WindowLight,
    House,
    Door,
    Moon,
    SpiderWeb,
    PumpkinSong,
    GuitarPieps0,
    GuitarPieps1,
    GuitarPieps2,
    GuitarPieps3,
    GuitarPieps4,
    GuitarPieps5,
    GuitarPieps6,
    SingPieps0,
    SingPieps1,
    SingPieps2,
    SingPieps3,
} from '../../assetLoader/AssetLoader.js';

export default class World1 {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
        this.flickerTimer = 0;
        this.flickerDelay = 100;
        this.isMusicPlaying = false;
    };

    initPools() {
        
    };

    static loadSprites(scene) {
        if (!scene.textures.exists(KEYS.KEY_BACKGROUND)) scene.load.image(KEYS.KEY_BACKGROUND, Background);
        if (!scene.textures.exists(KEYS.KEY_BUSH1)) scene.load.image(KEYS.KEY_BUSH1, Bush1);
        if (!scene.textures.exists(KEYS.KEY_BUSH2)) scene.load.image(KEYS.KEY_BUSH2, Bush2);
        if (!scene.textures.exists(KEYS.KEY_BUSH3)) scene.load.image(KEYS.KEY_BUSH3, Bush3);
        if (!scene.textures.exists(KEYS.KEY_BUSH4)) scene.load.image(KEYS.KEY_BUSH4, Bush4);
        if (!scene.textures.exists(KEYS.KEY_BUSH5)) scene.load.image(KEYS.KEY_BUSH5, Bush5);
        if (!scene.textures.exists(KEYS.KEY_HOUSE)) scene.load.image(KEYS.KEY_HOUSE, House);
        if (!scene.textures.exists(KEYS.KEY_DOOR)) scene.load.image(KEYS.KEY_DOOR, Door);
        if (!scene.textures.exists(KEYS.KEY_WINDOW)) scene.load.image(KEYS.KEY_WINDOW, WindowLight);
        if (!scene.textures.exists(KEYS.KEY_FELD)) scene.load.image(KEYS.KEY_FELD, Feld);
        if (!scene.textures.exists(KEYS.KEY_GRAS)) scene.load.image(KEYS.KEY_GRAS, Gras);
        if (!scene.textures.exists(KEYS.KEY_GROUND)) scene.load.image(KEYS.KEY_GROUND, Ground);
        if (!scene.textures.exists(KEYS.KEY_BAUM)) scene.load.image(KEYS.KEY_BAUM, Baum);
        if (!scene.textures.exists(KEYS.KEY_MOON)) scene.load.image(KEYS.KEY_MOON, Moon);
        if (!scene.textures.exists(KEYS.KEY_SPIDERWEB)) scene.load.image(KEYS.KEY_SPIDERWEB, SpiderWeb);
        if (!scene.textures.exists(KEYS.KEY_PUMPKINBIG)) scene.load.image(KEYS.KEY_PUMPKINBIG, PumpkinBig);

        //Import Guitar Pieps
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps0)) scene.load.image(KEYS.KEY_GuitarPieps0, GuitarPieps0);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps1)) scene.load.image(KEYS.KEY_GuitarPieps1, GuitarPieps1);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps2)) scene.load.image(KEYS.KEY_GuitarPieps2, GuitarPieps2);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps3)) scene.load.image(KEYS.KEY_GuitarPieps3, GuitarPieps3);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps4)) scene.load.image(KEYS.KEY_GuitarPieps4, GuitarPieps4);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps5)) scene.load.image(KEYS.KEY_GuitarPieps5, GuitarPieps5);
        if (!scene.textures.exists(KEYS.KEY_GuitarPieps6)) scene.load.image(KEYS.KEY_GuitarPieps6, GuitarPieps6);

        //Import Sing Pieps
        if (!scene.textures.exists(KEYS.KEY_SING_PIEPS0)) scene.load.image(KEYS.KEY_SING_PIEPS0, SingPieps0);
        if (!scene.textures.exists(KEYS.KEY_SING_PIEPS1)) scene.load.image(KEYS.KEY_SING_PIEPS1, SingPieps1);
        if (!scene.textures.exists(KEYS.KEY_SING_PIEPS2)) scene.load.image(KEYS.KEY_SING_PIEPS2, SingPieps2);
        if (!scene.textures.exists(KEYS.KEY_SING_PIEPS3)) scene.load.image(KEYS.KEY_SING_PIEPS3, SingPieps3);


        scene.load.audio(KEYS.KEY_PUMPKIN_SONG, PumpkinSong);
    };

    static initAnimations(scene) {
        scene.anims.create({
            key: "guitarAnim",
            frames: [
                { key: KEYS.KEY_GuitarPieps0 },
                { key: KEYS.KEY_GuitarPieps1 },
                { key: KEYS.KEY_GuitarPieps2 },
                { key: KEYS.KEY_GuitarPieps3 },
                { key: KEYS.KEY_GuitarPieps4 },
                { key: KEYS.KEY_GuitarPieps5 },
                { key: KEYS.KEY_GuitarPieps6 },
            ],
            frameRate: 20,
            repeat: -1
        })

        scene.anims.create({
            key: "singAnim",
            frames: [
                { key: KEYS.KEY_SING_PIEPS0 },
                { key: KEYS.KEY_SING_PIEPS1 },
                { key: KEYS.KEY_SING_PIEPS2 },
                { key: KEYS.KEY_SING_PIEPS3 },
            ],
            frameRate: 10,
            repeat: -1
        })
    };

    create() {
        World1Config.backgroundPositions.forEach(({ x, y, key, alpha, depth, scale }) => {
            let image = this.scene.add.sprite(x, y, key);
            image.scale = scale;
            image.depth = -10;
            image.alpha = alpha;
        });

        this.bush1 = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BUSH1);
        this.bush1.scale = 1;
        this.bush1.depth = 10;

        this.bush2 = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BUSH2);
        this.bush2.scale = 1;
        this.bush2.depth = 10;

        this.bush3 = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BUSH3);
        this.bush3.scale = 1;
        this.bush3.depth = 10;

        this.bush4 = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BUSH4);
        this.bush4.scale = 1;
        this.bush4.depth = 10;

        this.bush5 = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BUSH5);
        this.bush5.scale = 1;
        this.bush5.depth = 10;

        this.house = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_HOUSE);
        this.house.scale = 1;
        this.house.depth = 9;

        this.door = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_DOOR);
        this.door.scale = 1;
        this.door.depth = 9;

        this.houseWindow = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_WINDOW);
        this.houseWindow.scale = 1;
        this.houseWindow.depth = 7;

        this.feld = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_FELD);
        this.feld.scale = 1;
        this.feld.depth = 9;

        this.gras = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_GRAS);
        this.gras.scale = 1;
        this.gras.depth = 10;

        this.ground = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_GROUND);
        this.ground.scale = 1;
        this.ground.depth = 9;

        this.moon = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_MOON);
        this.moon.scale = 1;
        this.moon.depth = 10;

        this.baum = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_BAUM);
        this.baum.scale = 1;
        this.baum.depth = 6;

        this.spiderWeb = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_SPIDERWEB);
        this.spiderWeb.scale = 1;
        this.spiderWeb.depth = 10;

        this.pumpkinBig = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0), KEYS.KEY_PUMPKINBIG);
        this.pumpkinBig.scale = 1;
        this.pumpkinBig.depth = 10;

        this.guitarPieps = this.scene.add.sprite(calcBackPositionX(0) - 100, calcBackPositionY(0) + 400, KEYS.KEY_GuitarPieps0)
        this.guitarPieps.scale = 0.25
        this.guitarPieps.depth = 11

        this.singPieps = this.scene.add.sprite(calcBackPositionX(0), calcBackPositionY(0) + 320, KEYS.KEY_SING_PIEPS0)
        this.singPieps.scaleX = -0.25
        this.singPieps.scaleY = 0.25
        this.singPieps.depth = 10

        this.pumpkinSound = this.scene.sound.add(KEYS.KEY_PUMPKIN_SONG, { volume: -0.5 });

        this.analyser = this.scene.sound.context.createAnalyser();
        this.analyser.fftSize = 256;
        //this.analyser.smoothingTimeConstant = 0.8; //If Smoothing is needet
        this.frequencyDataArray = new Uint8Array(this.analyser.frequencyBinCount);

        this.pumpkinSound.on('play', this.handlePumpkinSoundPlay, this);

        this.scene.input.on('pointerdown', () => {
            if (this.scene.sound.context.state === 'suspended') {
                this.scene.sound.context.resume().then(() => {
                    console.log('AudioContext erfolgreich entsperrt.');
                    if (!this.pumpkinSound.isPlaying) {
                        this.guitarPieps.anims.play("guitarAnim")
                        this.pumpkinSound.play();
                    }
                });
            } else {
                if (!this.pumpkinSound.isPlaying) {
                    this.pumpkinSound.play();
                }
            }
        });
    };

    handlePumpkinSoundPlay() {
        this.connectAnalyserNode();
    }

    connectAnalyserNode() {
        if (this.pumpkinSound && this.pumpkinSound.source) {
            this.pumpkinSound.source.connect(this.analyser);
            this.analyser.connect(this.scene.sound.context.destination);
        } else {
            console.warn('Sound source is not available.');
        }
    }

    windowFlicker() {
        if (this.analyser) {
            this.analyser.getByteFrequencyData(this.frequencyDataArray);
    
            let bassFrequencies = this.frequencyDataArray.slice(2, 3);
    
            this.bassVolume = bassFrequencies.reduce((a, b) => a + b, 1) / bassFrequencies.length;
    
            //console.log('Bass Volume:', this.bassVolume);
    
            let threshold = 210;
            let adjustedBassVolume = this.bassVolume - threshold;
    
            adjustedBassVolume = Math.max(0, adjustedBassVolume);
    
            let maxPossibleVolume = 255 - threshold;
            let normalizedBass = adjustedBassVolume / maxPossibleVolume;
    
            //console.log('Adjusted Bass Volume:', adjustedBassVolume);
            //console.log('Normalized Bass:', normalizedBass);
    
            let scalingFactor = 2;
            let alphaValue = normalizedBass * scalingFactor;
    
            alphaValue = Phaser.Math.Clamp(alphaValue, 0, 1);
    
            //console.log('Alpha Value:', alphaValue);
    
            this.houseWindow.alpha = alphaValue;
        } else {
            let randomNum = Math.random();
            this.houseWindow.alpha = randomNum;
        }
    }
    
    guitarHandler() {
        if (this.bassVolume <= 200) {
            this.guitarPieps.anims.stop()
        } else {
            if (!this.guitarPieps.anims.isPlaying) {
                this.guitarPieps.anims.play("guitarAnim")
            }
        }
    }

    singPiepsHandler() {
        if (this.bassVolume <= 220) {
            this.singPieps.anims.stop()
        } else {
            if (!this.singPieps.anims.isPlaying) {
                this.singPieps.anims.play("singAnim")
            }
        }
    }
    

    update(time, delta) {
        if (!this.pumpkinSound.isPlaying) {
            this.pumpkinSound.play()

        }
        this.guitarHandler();
        this.singPiepsHandler();
        this.flickerTimer += delta;

        if (this.flickerTimer >= this.flickerDelay) {
            this.windowFlicker();
            this.flickerTimer = 0;
        }
    };
};
