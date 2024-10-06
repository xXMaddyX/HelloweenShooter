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

        scene.load.audio(KEYS.KEY_PUMPKIN_SONG, PumpkinSong);
    };

    initAnimations() {
        
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

        this.pumpkinSound = this.scene.sound.add(KEYS.KEY_PUMPKIN_SONG, { loop: true });

        this.analyser = this.scene.sound.context.createAnalyser();
        this.analyser.fftSize = 512;
        this.analyser.smoothingTimeConstant = 0.8;
        this.frequencyDataArray = new Uint8Array(this.analyser.frequencyBinCount);

        this.pumpkinSound.on('play', this.connectAnalyserNode, this);

        this.scene.input.on('pointerdown', () => {
            if (this.scene.sound.context.state === 'suspended') {
                this.scene.sound.context.resume().then(() => {
                    console.log('AudioContext erfolgreich entsperrt.');
                    if (!this.pumpkinSound.isPlaying) {
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

    connectAnalyserNode() {
        if (this.pumpkinSound && this.pumpkinSound.source) {
            this.pumpkinSound.source.connect(this.analyser);
            this.analyser.connect(this.scene.sound.context.destination);

            this.pumpkinSound.off('play', this.connectAnalyserNode, this);
        } else {
            console.warn('Sound source is not available.');
        }
    }

    windowFlicker() {
        if (this.analyser) {
            this.analyser.getByteFrequencyData(this.frequencyDataArray);
    
            let bassFrequencies = this.frequencyDataArray.slice(2, 3);
    
            let bassVolume = bassFrequencies.reduce((a, b) => a + b, 1) / bassFrequencies.length;
    
            console.log('Bass Volume:', bassVolume);
    
            let threshold = 210;
            let adjustedBassVolume = bassVolume - threshold;
    
            adjustedBassVolume = Math.max(0, adjustedBassVolume);
    
            let maxPossibleVolume = 255 - threshold;
            let normalizedBass = adjustedBassVolume / maxPossibleVolume;
    
            console.log('Adjusted Bass Volume:', adjustedBassVolume);
            console.log('Normalized Bass:', normalizedBass);
    
            let scalingFactor = 1.5;
            let alphaValue = normalizedBass * scalingFactor;
    
            alphaValue = Phaser.Math.Clamp(alphaValue, 0, 1);
    
            console.log('Alpha Value:', alphaValue);
    
            this.houseWindow.alpha = alphaValue;
        } else {
            let randomNum = Math.random();
            this.houseWindow.alpha = randomNum;
        }
    }
    
    

    update(time, delta) {
        this.flickerTimer += delta;

        if (this.flickerTimer >= this.flickerDelay) {
            this.windowFlicker();
            this.flickerTimer = 0;
        }
    };
};
