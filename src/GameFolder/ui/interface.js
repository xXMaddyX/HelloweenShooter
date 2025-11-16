import SceneLvL1 from "../scenes/SceneWorld1/SceneWorld1.js";
import LoadDataFromApi from "../scenes/SceneWorld1/LoadDataFromAPI.js";
import { HappyHelloween, Start, HighScore, Restart } from '../assetLoader/AssetLoader.js';

const KEYS = {
    KEY_HAPPY_HELLOWEEN: "HappyHelloween",
    KEY_START: "Start",
    KEY_RESTART: "Restart",
    KEY_HIGH_SCORE: "HighScore",
};

export default class UiInterface {
    constructor(scene) {
        /**@type {SceneLvL1} */
        this.scene = scene;
        this.scoresRefPool = [];
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
        this.score1 = this.scene.add.text(725, 210, `Player1: 0`)
        this.score2 = this.scene.add.text(760, 317, `Player2: 0`)
        this.score3 = this.scene.add.text(725, 430, `Player3: 0`)
        this.score4 = this.scene.add.text(780, 535, `Player4: 0`)
        this.score5 = this.scene.add.text(740, 637, `Player5: 0`)
        
        this.scoresRefPool.push(this.score1);
        this.scoresRefPool.push(this.score2);
        this.scoresRefPool.push(this.score3);
        this.scoresRefPool.push(this.score4);
        this.scoresRefPool.push(this.score5);

        for (let item of this.scoresRefPool) {
            item.depth = 20;
            item.scale = 2
        };
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
        this.scoresRefPool.forEach(item => {
            item.visible = false;
        })
    }

    setOnDisableStartScreen() {
        this.happyHelloween.visible = false
        this.startBtn.visible = false
        this.restart.visible = false
        this.highScore.visible = false
        this.setScoresOnStartScreen();
        this.scene.resetScore();
    }

    async setShowHighScore() {
        this.highScore.visible = true;
        this.restart.visible = true;
        this.scoresRefPool.forEach(item => item.visible = true);
        await this.checkScores();
        //Push data to server!!!!
        this.sendDataToBackend();
        this.updateInterface();
        this.scene.resetScore();
    };

    async sendDataToBackend() {
        let resp;
        try {
            resp = await fetch("http://159.195.27.147:3030/write", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.scene.SCORE_DATA_FROM_API),
            });
        } catch (err) {
            resp = err
        } finally {
            console.info(await resp)
        }
    };

    async checkScores() {
        await this.scene.runAPIFetch();
        for (let i = 0; i < this.scene.SCORE_DATA_FROM_API.length; i++) {
            if (this.scene.score > this.scene.SCORE_DATA_FROM_API[i].score) {
                this.scene.SCORE_DATA_FROM_API[i].score = this.scene.score;
                    return;
            } else {
                continue;
            }
        };
    };

    startGame() {
        this.scene.startGame();
    };
    
    updateInterface() {
        for (let i = 0; i < this.scoresRefPool.length; i++) {
            this.scoresRefPool[i].text = `Player${this.scene.SCORE_DATA_FROM_API[i].player}: ${this.scene.SCORE_DATA_FROM_API[i].score}`
        }
    }

    update() {

    };
};