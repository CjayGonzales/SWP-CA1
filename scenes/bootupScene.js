class bootupScene extends Phaser.Scene {
    constructor(){
        super("bootGame");
    }

    preload(){
        this.loadImages(); //images
        this.loadSpriteSheets(); //spritesheets
        this.loadTilemaps(); //tilemaps/ objects
        this.loadSounds(); //sounds
        
    }

    loadImages(){
        this.load.image("background", "assets/images/background.png");
        this.load.image("ground", "assets/sprites/groundSprite.png");
        this.load.image("bullet", "/assets/images/bullet.png");
        this.load.image("button1", "assets/images/button_1.png");
        this.load.image("button2", "assets/images/button_2.png");
        this.load.image("easterEgg", "assets/images/easterEgg.png");
    }

    loadSpriteSheets(){
        this.load.spritesheet("player", "assets/sprites/adventurer.png",{
            frameWidth: 50,
            frameHeight: 37,
        });

        this.load.spritesheet("flyingEnemy", "assets/sprites/flyingEnemy.png",{
            frameWidth: 150,
            frameHeight: 150,
        });
        this.load.spritesheet("coin", "assets/tilemaps/coin.png", {
            frameHeight: 20,
            frameWidth: 20,
        });
        this.load.spritesheet("groundEnemy", "assets/sprites/enemy2/enemy2run.png",{
            frameWidth: 35,
            frameHeight: 43,
        });

        this.load.spritesheet("groundEnemyDeath", "assets/sprites/enemy2/enemy2death.png",{
            frameWidth: 35,
            frameHeight: 43,
        });

        //load boss assets (Striker)
        this.load.spritesheet("bossDash", "assets/sprites/striker/boss_dash.png",{
            frameWidth: 96,
            frameHeight: 96,
        });

        this.load.spritesheet("bossDeath", "assets/sprites/striker/boss_death.png",{
            frameWidth: 96,
            frameHeight: 96,
        });

        this.load.spritesheet("bossJump", "assets/sprites/striker/boss_jump.png",{
            frameWidth: 96,
            frameHeight: 96,
        });

        this.load.spritesheet("bossRun", "assets/sprites/striker/boss_run.png",{
            frameWidth: 96,
            frameHeight: 96,
        });

        this.load.spritesheet("bossIdle", "assets/sprites/striker/boss_idle.png",{
            frameWidth: 96,
            frameHeight: 96,
        });
    }

    loadTilemaps(){
        this.load.image("coin", 'assets/tilemaps/coin.png');
        this.load.image("potion", 'assets/tilemaps/potion.png');
        this.load.image("tiles", "assets/tilemaps/simples_pimples.png");
        this.load.image("castle-tileset", "assets/tilemaps/castle-tileset.png");
        this.load.image("infinitySphere", "assets/tilemaps/infinitySphere.png")
        this.load.tilemapTiledJSON("map", "assets/tilemaps/anotherTest.json");
        this.load.tilemapTiledJSON("level2map", "assets/tilemaps/level2.json");
    }

    loadSounds(){
        this.load.audio("menuSong", "assets/sounds/menu.wav");
        this.load.audio("collectCoinSound", "assets/sounds/collectCoin.wav")
        this.load.audio("jumpSound", "assets/sounds/jumpSound.wav");
        this.load.audio("shootSound", "assets/sounds/laserGunSound.wav");
        this.load.audio("gameOverSound", "assets/sounds/gameOver.wav");
        this.load.audio("level1song", "assets/sounds/level1Song.wav");
        this.load.audio("level2song", "assets/sounds/level2Song.wav");

    }
    
    //starts the title scene
    create(){
        this.scene.start("Title");
    }

}


