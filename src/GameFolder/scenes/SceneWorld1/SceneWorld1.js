import Phaser from "phaser";
import World1 from "../../worlds/world1/World1";
import Pieps from "../../monsters/pieps/pieps";
import Player from "../../player/player";
import FlyingPumpkin from "../../monsters/FlyingPumpkin";

export default class SceneLvL1 extends Phaser.Scene {
    constructor() {
        super("SceneLvL1");
        this.screenWidth = 1920;
        this.screenHeight = 1080;
    };

    initScene() {
        
    };

    resetScene() {
        
    };
    
    preload() {
        Player.loadSprites(this);
        World1.loadSprites(this);
        Pieps.loadSprites(this);
        FlyingPumpkin.loadSprites(this);
    };
    
    create() {
        this.physics.world.setBounds(0, 0, this.sceneWidth, this.sceneHeight);
        
        World1.initAnimations(this)
        this.world = new World1(this)
        this.world.create()
        
        this.pieps = new Pieps(this);
        this.pieps.create()
        
        FlyingPumpkin.initAnimations(this)
        this.pumpkins = new FlyingPumpkin(this);
        this.pumpkins.create()
        
        this.playerCross = new Player(this)
        this.playerCross.create()
    };

    update(time, delta) {
        this.world.update(time, delta);
        this.pieps.update(time, delta);
        this.playerCross.update(time, delta)
    };
};