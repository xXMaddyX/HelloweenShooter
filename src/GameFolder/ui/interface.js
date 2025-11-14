import Phaser from "phaser";
import { HappyHelloween, Start, HighScore, Restart } from '../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_HAPPY_HELLOWEEN: "HappyHelloween",
    KEY_START: "Start",
    KEY_RESTART: "Restart",
    KEY_HIGH_SCORE: "HighScore",
};

export default class UiInterface {
    constructor(scene) {
        /**@type {Phaser.Scene} */
        this.scene = scene;
    };

    static loadSprites(scene) {
        scene.load.image(KEYS.KEY_HAPPY_HELLOWEEN, HappyHelloween);
        scene.load.image(KEYS.KEY_START, Start);
        scene.load.image(KEYS.KEY_RESTART, Restart);
        scene.load.image(KEYS.KEY_HIGH_SCORE, HighScore);
    };

    initAnims() {

    };

    create() {
        this.happyHelloween = this.scene.add.sprite(910, 100, KEYS.KEY_HAPPY_HELLOWEEN);
        this.happyHelloween.scale = 0.25
        this.happyHelloween.depth = 20

        this.startBtn = this.scene.add.sprite(900, 600, KEYS.KEY_START)
        this.startBtn.scale = 0.25
        this.startBtn.depth = 20
        this.startBtn.setScrollFactor(0)
        this.startBtn.setInteractive();
        this.startBtn.on("pointerdown", () => {
            this.setOnDisableStartScreen();
            this.startGame();
        });

        this.highScore = this.scene.add.sprite(900, 450, KEYS.KEY_HIGH_SCORE);
        this.highScore.scale = 0.25;
        this.highScore.depth = 19;

        this.restart = this.scene.add.sprite(900, 950, KEYS.KEY_RESTART);
        this.restart.scale = 0.25;
        this.restart.depth = 20;
        this.restart.setScrollFactor(0);
        this.restart.setInteractive();
        this.restart.on("pointerdown", () => {
            this.setOnDisableStartScreen();
            this.startGame();
        })
        //HERE GET DATA FROM MAIN SCENE FOR SET DATA.
        this.score1 = this.scene.add.text(725, 210,"PLayer1: 0")
        this.score1.depth = 20
        this.score1.scale = 2

        this.score2 = this.scene.add.text(760, 317, "Player2: 0")
        this.score2.depth = 20
        this.score2.scale = 2

        this.score3 = this.scene.add.text(725, 430, "Player3: 0")
        this.score3.depth = 20;
        this.score3.scale = 2;

        this.score4 = this.scene.add.text(780, 535, "Player4: 0")
        this.score4.depth = 20;
        this.score4.scale = 2;

        this.score5 = this.scene.add.text(740, 637, "Player5: 0")
        this.score5.depth = 20;
        this.score5.scale = 2;

        this.setOnStartScreen();
    };

    setOnStartScreen() {
        this.happyHelloween.active = true;
        this.startBtn.active = true;
        this.highScore.visible = false;
        this.restart.visible = false;
        this.setScoresOnStartScreen();
    }

    setScoresOnStartScreen() {
        this.score1.visible = false;
        this.score2.visible = false;
        this.score3.visible = false;
        this.score4.visible = false;
        this.score5.visible = false;
    }

    setOnDisableStartScreen() {
        this.happyHelloween.visible = false
        this.startBtn.visible = false
        this.restart.visible = false
        this.highScore.visible = false
        this.score1.visible = false
        this.scene.resetScore();
    }

    setShowHighScore() {
        this.highScore.visible = true;
        this.restart.visible = true;
        this.score1.visible = true;

        //WE NEED TO STORE DATA HERE BECOUSE OF SERVER!!!!
        this.score1.text = `Score1: ${this.scene.score}`
        this.scene.resetScore();
    }

    startGame() {
        this.scene.startGame();
    };

    update() {

    };
};