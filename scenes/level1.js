class level1 extends Phaser.Scene {
    constructor(){
        super("playGame");
    }

    init(){
        this.xPos = 0;
        this.yPos = 0;
        this.playerSpeed = 1.5;
        this.speed = 2.0;
        this.enemyMaxX = 280;
        this.enemyMinX = 80;
        this.playerHealth = 0;
        this.score = 0;
        this.scalew = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create(){

        this.init();
        this.createTilemap();
        this.createPlayer();
        this.createCamera();
        this.playAudio();
        this.customCursor();
        
        this.createCoin();
        this.createPotion();

        this.createFlyingEnemy();
        this.createGroundEnemy();

        this.createText();
        this.makeBullets();

        this.physics.add.collider(this.groundLayer, this.enemies);
    }

    update(){

        //moves player and enemy
        this.movePlayer();
        this.moveEnemy();
        
        //player hp update
        this.scoreUpdate(); 
        this.playerHp();
        
        //next scenes
        this.gameOver();
        this.youWin();

        //shooting bullets
        this.shootBullet();

        //updates enemies
        this.enemies.children.each(function(enemy){
            enemy.update();
        } ,this);

    }

    //binding to WASD keys instead of arrow keys
    customCursor(){ 
        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    //create Camera
    createCamera(){

        //sets it to camera variable
        this.camera = this.cameras.main;

        //camera zoom
        this.camera.setZoom(1.5);
        
        //makes it move with player
        this.cursors = this.input.keyboard.createCursorKeys();

        this.camera.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );
        this.physics.world.setBounds(
            0,
            0,
            this.map.widthInPixels,
            this.map.heightInPixels
        );
    }

    //tilemap creation including objects
    createTilemap(){ 
        this.map = this.make.tilemap({ key: "map"});
        console.log("mapWidth: ", this.map.widthInPixels);
        console.log("mapHeight", this.map.heightInPixles);

        this.tileset = this.map.addTilesetImage("simples_pimples", "tiles");
        this.groundLayer = this.map.createStaticLayer(
            "groundLayer",
            this.tileset,
            0,
            0
        );

        this.backgroundTileset = this.map.addTilesetImage("castle_tilesheet", "castle-tileset");
        this.background_layer = this.map.createStaticLayer(
            "background_layer",
            this.backgroundTileset,
            0,
            0
        );

        this.furnitureTileset = this.map.addTilesetImage("castle_tilesheet", "castle-tileset");
        this.furniture_layer = this.map.createStaticLayer(
            "furniture_layer",
            this.furnitureTileset,
            0,
            0
        );
        this.groundLayer.setCollisionByExclusion(-1, true);
    }

    //makes the one flying enemy
    createFlyingEnemy(flyingEnemy, speed){
        this.flyingEnemy = this.physics.add.sprite(this.xPos + 90, this.yPos + 320, "flyingEnemy");
        this.flyingEnemy.setScale(.5);
        this.anims.create({
        key: "flyingEnemyAnim",
        frames: this.anims.generateFrameNumbers("flyingEnemy"),
        frameRate: 20,
        repeat: -1            
        });
        this.flyingEnemy.play("flyingEnemyAnim");
       
        this.physics.add.overlap(
            this.player,
            this.flyingEnemy,
            this.collisionChecker,
            null,
            this
        );
    }

    //makes the ground enemies
    createGroundEnemy(){
        //V3
        this.enemies = this.physics.add.group()

        //it takes from the Ground Enemy class and spawns it in here
        var groundEnemy = new GroundEnemy (this, 220, 360);
        var groundEnemy = new GroundEnemy (this, 220, 460);
        var groundEnemy = new GroundEnemy (this, 813, 253);
        var groundEnemy = new GroundEnemy (this, 770, 110);
        var groundEnemy = new GroundEnemy (this, 420, 254);
        var groundEnemy = new GroundEnemy (this, 41, 493);
        var groundEnemy = new GroundEnemy (this, 579, 494);
        var groundEnemy = new GroundEnemy (this, 795, 350);
        var groundEnemy = new GroundEnemy (this, 907, 686);
        var groundEnemy = new GroundEnemy (this, 780, 910);
        var groundEnemy = new GroundEnemy (this, 583, 910);
        var groundEnemy = new GroundEnemy (this, 582, 654);
        var groundEnemy = new GroundEnemy (this, 341, 670);
        var groundEnemy = new GroundEnemy (this, 907, 686);
        var groundEnemy = new GroundEnemy (this, 33, 830);
        var groundEnemy = new GroundEnemy (this, 41, 910);
        var groundEnemy = new GroundEnemy (this, 1063, 110);
        var groundEnemy = new GroundEnemy (this, 243, 789);
        var groundEnemy = new GroundEnemy (this, 25, 830);
        var groundEnemy = new GroundEnemy (this, 76, 910);
          
        //adds collision between player and enemy
        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.collisionChecker,
            null,
            this
        );
    }

    //player creation
    createPlayer(){ 
        this.player = this.physics.add.sprite(50, 110, "player");
        this.player.setGravityY(7900);
        this.isPlayerAlive = true;
        this.player.score = 0;
        this.playerHealth = 100;
        this.player.setCollideWorldBounds(true);

        //animations
        this.anims.create({
            key:"idle",
            frames: this.anims.generateFrameNumbers("player",{
                start:0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.anims.create({
            key:"right",
            frames: this.anims.generateFrameNumbers("player", {
                start: 8,
                end: 13
            }),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key:"left",
            frames: this.anims.generateFrameNumbers("player", {
                start: 8,
                end: 13
            }),
        });
        this.anims.create({
            key:"jump",
            frames: this.anims.generateFrameNumbers("player", {
                start: 15,
                end: 23
            }),
            frameRate: 1,
            repeat: -1,
        });
        console.log(this.player)
         
    //player collision with ground layer
    this.physics.add.collider(this.player, this.groundLayer);

    //camera following the player
    this.cameras.main.startFollow(this.player);
    }

    //Makes coins
    createCoin(){
        this.coin = this.physics.add.group({
            allowGravity: true,
            immovable: true,
           });
        
        const coinObject = this.map.getObjectLayer('coin')['objects'];

        coinObject.forEach(coinObject => {
            const coin = this.coin.create(coinObject.x, coinObject.y - coinObject.height, 'coin').setOrigin(0,0);
            this.coin.x += this.speed;
        });

        this.physics.add.overlap(
            this.player,
            this.coin,
            this.collectCoin,
            null,
            this
        ); 
        
    }

    //Makes potion
    createPotion(){
        this.potion = this.physics.add.group({
            allowGravity: true,
            immovable: true,
        });
        const potionObject = this.map.getObjectLayer('hp')['objects'];
        
        potionObject.forEach(potionObject => {
            const potion = this.potion.create(potionObject.x, potionObject.y - potionObject.height, 'potion').setOrigin(0,0);
        });

        //Collision with player
        this.physics.add.overlap(
            this.player,
            this.potion,
            this.collectPotion,
            null,
            this
        ); 
     }

    //create Backgrounds


    //makes background text
    createText() {
        this.scoreText = this.add.text(16, 16, "Score: 0", {
          fontSize: "32px",
          fill: "#ffffff",
        });
        this.hpText = this.add.text(16, 42, "HP: 0", {
            fontSize: "32px",
            fill: "#ffffff",
          });
    }

    //shows the player HP
    playerHp(){
        var test = 20;
        this.hpText.setText("HP: " + this.playerHealth);
        
        //follow player
        this.hpText.x = this.player.body.position.x - 25;
        this.hpText.y = this.player.body.position.y - 20;

        this.scoreText.x = this.player.body.position.x - 40;
        this.scoreText.y = this.player.body.position.y - 45;
    }

    //Enemy movement
    moveEnemy(){
        this.flyingEnemy.x += this.speed;
        if(this.flyingEnemy.x == this.enemyMaxX){
          this.speed = -2;
          this.flyingEnemy.x += this.speed;
          this.flyingEnemy.flipX = true;
        } else if(this.flyingEnemy.x == this.enemyMinX){
            this.speed = 2;
            this.flyingEnemy.x += this.speed;
            this.flyingEnemy.flipX = false;
        }
    }
    
    //player controls stuff - devNote, i found the reason of the gravity bug but i decided to keep it in. I changed it in the 
    //next scene though so the graivty is fixed there.
    movePlayer(){ 
        if(this.cursors.left.isDown){
            this.player.setVelocity(-350,0);
            this.player.flipX=true; //makes him go left
            this.player.anims.play("right", true);

        } else if(this.cursors.right.isDown){
            this.player.setVelocity(350,0);
            this.player.flipX=false; //makes him go right
            this.player.anims.play("right", true);

        } else if(this.cursors.down.isDown){
            this.player.setVelocity(0,350);

        } else if(this.cursors.up.isDown && this.player.body.onFloor()){ //jump
            this.player.setVelocityY(-5000);
            this.player.anims.play("jump", true);
            this.jumpSound.play();

        } else {
            this.player.anims.play("idle", true);
            this.player.setVelocity(0,0);
        }
    }

    //creates bullets
    makeBullets(){
        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 7,
            runChildUpdate: true
        });
        this.bullet;
        this.lastShot = 0;

        //collision with flying Enemy
        this.physics.add.overlap(
            this.bullets,
            this.flyingEnemy,
            this.bulletEnemyCollision,
            null,
            this
        );

        //collision with ground Enemies
        this.physics.add.overlap(
            this.bullets,
            this.enemies,
            this.groundBulletEnemyCollision,
            null,
            this
        );
    }

    //audio for background music
    playAudio(){
        
        //creates the music and sets it to gameMusic
        this.gameMusic = this.sound.add("level1song");

        //loops
        this.gameMusic.loop = true;

        //plays the audio
        this.gameMusic.play();

        //adjusts audio
        this.gameMusic.volume = 0.10;

        //puts the jump sound in
        this.jumpSound = this.sound.add("jumpSound");
        this.jumpSound.volume = 0.5;
        
        //collection sound
        this.collectCoinSound = this.sound.add("collectCoinSound");
        this.collectCoinSound.volume = 0.5;
    }

    //bidning the bullet to the mouse input
    //and shooting it
    shootBullet(time, delta){
        if (this.input.activePointer.isDown) {
            this.bullet = this.bullets.get();

            if (this.bullet)
            {
                this.bullet.shoot(this.player.x, this.player.y);
                this.lastFired = time + 50;
                this.music = this.sound.add("shootSound");
                this.music.play();
            }
          }
    }

    //flying enemy + bullet collision
    bulletEnemyCollision(bullet, flyingEnemy){
        this.flyingEnemy.disableBody(true, true);
    }

    //ground enemy + bullet collision
    groundBulletEnemyCollision(bullet, enemy){
        enemy.play("groundEnemyDeathAnim");
        enemy.destroy();
    }

    //player + coin collision
    collectCoin(player, coin){

        //updates coin when it's collected
        this.player.score ++ ; 

        ////disables coin 
        coin.disableBody(true, true); 

        //plays coin sound
        this.collectCoinSound.play();
    }

    //player + potion collision
    collectPotion(player, potion){
        //for loop adds the health
        for(var i = 0; i < 20; i++){
            this.playerHealth ++;
            i++;
        }
        this.hpText +10;
        potion.disableBody(true, true);
        console.log(this.playerHealth);
    }

    //player + flying Enemy collision
    collisionChecker(player, flyingEnemy){
        if (this.player.x.y == this.flyingEnemy.x.y){
            // game.time.events.add(Phaser.Timer.SECOND*5, this.delayOver, this);
            this.playerHealth = this.playerHealth - 1.0;  
            }
        if (this.playerHealth < 0){
            this.isPlayerAlive = false;
        }
    }

    //updating the score when coin is collected
    scoreUpdate(){
        this.scoreText.setText("Score: " + this.player.score);
        this.hpText.setText("Hp: " + this.playerHealth);
    }

    //brings to the gameover scene
    gameOver() {

        if(this.isPlayerAlive == false){
            console.log("You Died");
            this.scene.start("GameOver");
            this.music = this.sound.add("gameOverSound");
            this.music.play();
            this.gameMusic.stop();
        }
    }

    //takes you to the next level
    youWin(){
        if(this.player.score >= 35){
            this.scene.start("level2");
            this.gameMusic.stop();
        }
    }
}