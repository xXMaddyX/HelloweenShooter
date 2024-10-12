import Phaser from "phaser";
import World1 from "../../worlds/world1/World1";
import Pieps from "../../monsters/pieps/pieps";
import Player from "../../player/player";
import SmalEnemyPumpkin from "../../monsters/pumpkins/pumpkin";
import SmalerEnemyPumpkin from "../../monsters/pumpkins/smalerPumpkin";
import BigEnemyPumpkin from "../../monsters/pumpkins/bigPumpkin";
import FlyingPumpkin from "../../monsters/FlyingPumpkin";
import PlusFiftyPointsClass from "../../scores/Plus50Points";
import Plus100PointsClass from "../../scores/Plus100Points";
import Plus200PointsClass from "../../scores/Plus200Points";
import Plus25PointsClass from "../../scores/Plus25Points";
import FunnySpiderClass from "../../monsters/FunnySpider/funnySpider";
import Ghost from "../../monsters/Ghost/ghost";
import UiInterface from "../../ui/interface";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1");
        this.screenWidth = 1920;
        this.screenHeight = 1080;
        this.score = 0;
    };

    initScene() {
        
    };

    resetScene() {
        
    };
    
    preload() {
        Player.loadSprites(this);
        World1.loadSprites(this);
        UiInterface.loadSprites(this);
        Pieps.loadSprites(this);
        FlyingPumpkin.loadSprites(this);
        SmalEnemyPumpkin.loadSprites(this);
        SmalerEnemyPumpkin.loadSprites(this);
        BigEnemyPumpkin.loadSprites(this);
        PlusFiftyPointsClass.loadSprites(this);
        Plus100PointsClass.loadSprites(this);
        Plus200PointsClass.loadSprites(this);
        Plus25PointsClass.loadSprites(this);
        FunnySpiderClass.loadSprites(this);
        Ghost.loadSprite(this);
    };

    updateScore(addScore) {
        this.score += addScore;
        this.scoreBord.text = `Score: ${String(this.score)}`;
    };

    resetScore() {
        this.score = 0
        this.scoreBord.text = `Score: ${String(this.score)}`
    };

    create() {
        this.physics.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
        
        this.scoreBord = this.add.text(30, 30, `Score: ${String(this.score)}`)
        this.scoreBord.scale = 2;
        
        World1.initAnimations(this);
        this.world = new World1(this);
        this.world.create();

        this.uiInterface = new UiInterface(this);
        this.uiInterface.create();
        
        this.pieps = new Pieps(this);
        this.pieps.create();
        
        FlyingPumpkin.initAnimations(this);
        this.pumpkins = new FlyingPumpkin(this);
        this.pumpkins.create();
        
        this.playerCross = new Player(this);
        this.playerCross.create();

        this.testPumpkin = new SmalEnemyPumpkin(this);
        this.testPumpkin.create();

        this.smalPumpkin = new SmalerEnemyPumpkin(this);
        this.smalPumpkin.create();

        this.bigPumpkin = new BigEnemyPumpkin(this);
        this.bigPumpkin.create();

        this.plusFiftyPoints = new PlusFiftyPointsClass(this);
        this.plusFiftyPoints.create();

        this.plusHundredPoints = new Plus100PointsClass(this);
        this.plusHundredPoints.create();

        this.plus200Points = new Plus200PointsClass(this);
        this.plus200Points.create();

        this.plus200Points2 = new Plus200PointsClass(this);
        this.plus200Points2.create();

        this.plus25Points = new Plus25PointsClass(this);
        this.plus25Points.create();

        FunnySpiderClass.initAnims(this);
        this.funnySpider = new FunnySpiderClass(this);
        this.funnySpider.create();

        this.ghost = new Ghost(this);
        let ghostConfig = {range: 200, timeToShow: 30, visibleTime: 2};
        this.ghost.create(600, 400, ghostConfig);

        this.ghost2 =  new Ghost(this);
        let ghostConfig2 = {range: 200, timeToShow: 20, visibleTime: 2};
        this.ghost2.create(1400, 600, ghostConfig2);

        this.addCollition();
    };
    
    addCollition() {
        this.test = this.physics.add.overlap(this.playerCross.playerCross, this.testPumpkin.Pumpkin, () => {
            if (this.input.activePointer.isDown && !this.testPumpkin.isDestroyed) {
                this.testPumpkin.pumpkinDead();
                this.plusFiftyPoints.setActive(this.testPumpkin.Pumpkin.x, this.testPumpkin.Pumpkin.y);
                this.updateScore(50);
            };
        });

        this.physics.add.overlap(this.playerCross.playerCross, this.smalPumpkin.Pumpkin, () => {
            if (this.input.activePointer.isDown && !this.smalPumpkin.isDestroyed) {
                this.smalPumpkin.pumpkinDead();
                this.plusHundredPoints.setActive(this.smalPumpkin.Pumpkin.x, this.smalPumpkin.Pumpkin.y);
                this.updateScore(100);
            };
        });

        this.physics.add.overlap(this.playerCross.playerCross, this.bigPumpkin.Pumpkin, () => {
            if (this.input.activePointer.isDown && !this.bigPumpkin.isDestroyed) {
                this.bigPumpkin.pumpkinDead();
                this.plus25Points.setActive(this.bigPumpkin.Pumpkin.x, this.bigPumpkin.Pumpkin.y);
                this.updateScore(25);
            };
        });

        this.physics.add.overlap(this.playerCross.playerCross, this.ghost.Ghost, () => {
            if (this.input.activePointer.isDown && this.ghost.isActive) {
                this.ghost.resetGhostOnDead();
                this.plus200Points.setActive(this.ghost.Ghost.x, this.ghost.Ghost.y);
                this.updateScore(200);
            };
        });

        this.physics.add.overlap(this.playerCross.playerCross, this.ghost2.Ghost, () => {
            if (this.input.activePointer.isDown && this.ghost2.isActive) {
                this.ghost2.resetGhostOnDead();
                this.plus200Points2.setActive(this.ghost2.Ghost.x, this.ghost2.Ghost.y);
                this.updateScore(200);
            }
        })
        
    };

    update(time, delta) {
        this.playerCross.update(time, delta);
        this.world.update(time, delta);
        this.pieps.update(time, delta);
        this.testPumpkin.update(time, delta);
        this.smalPumpkin.update(time, delta);
        this.bigPumpkin.update(time, delta);
        this.plusFiftyPoints.update(time, delta);
        this.plusHundredPoints.update(time, delta);
        this.plus25Points.update(time, delta);
        this.plus200Points.update(time, delta);
        this.plus200Points2.update(time, delta);
        this.ghost.update(time, delta);
        this.ghost2.update(time, delta);
    };

    startGame() {
        this.world.startMusic();
        this.score = 0;
        this.ghost.resetGhostOnDead();
        this.ghost2.resetGhostOnDead();
    }

    stopGame() {
        this.uiInterface.setShowHighScore();
    }
};