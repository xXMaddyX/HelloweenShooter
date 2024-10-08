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
            console.log("is Triggert")
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

        this.score1 = this.scene.add.text(725, 210,"Score1: 0")
        this.score1.depth = 20
        this.score1.scale = 2

        this.setOnStartScreen();
        //this.setOnDisableStartScreen();
    };

    setOnStartScreen() {
        this.happyHelloween.active = true;
        this.startBtn.active = true;
        this.highScore.visible = false;
        this.restart.visible = false;
        this.score1.visible = false
    }

    setOnDisableStartScreen() {
        this.happyHelloween.visible = false
        this.startBtn.visible = false
        this.restart.visible = false
        this.highScore.visible = false
        this.score1.visible = false
    }

    setShowHighScore() {
        this.highScore.visible = true;
        this.restart.visible = true;
        this.score1.visible = true;
        this.score1.text = `Score1: ${this.scene.score}`
        this.scene.resetScore();
    }

    startGame() {
        this.scene.startGame();
    };

    update() {

    };
};