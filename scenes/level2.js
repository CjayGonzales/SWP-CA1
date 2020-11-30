class level2 extends Phaser.Scene {
    constructor(){
        super("level2");
    }

    init(){
        this.speed = 10;
        this.enemyMaxX = 280;
        this.enemyMinX = 80;
        this.bossCounter = 0;
        this.bossHp = 0;
        this.score = 0;
        this.infinitySpherePower = 0;
        this.egg = 1;
    }

    create(){
        this.init();
        this.level2Tilemap();
        this.createPlayer();
        this.createPotion();
        this.createCamera(); 
        this.customCursor();
        this.createText();
        this.createEnemies();
        this.createInfinitySphere();
        this.playAudio();
        this.createBoss();
        this.makeBullets();
        
               

        this.physics.add.collider(this.groundLayer, this.boss);
        this.physics.add.collider(this.groundLayer, this.enemies);
    }

    update(){
        this.playerHp();
        this.movePlayer();
        this.shootBullet();
        this.moveBoss();
        this.scoreUpdate();
        this.gameOver();
        
        this.enemies.children.each(function(enemy){
            enemy.update();
          } ,this);
    }

    level2Tilemap(){
        this.level2map = this.make.tilemap({key: "level2map"});

        this.backgroundTileset2 = this.level2map.addTilesetImage("castle_tilesheet", "castle-tileset");
        this.background_layer = this.level2map.createStaticLayer(
            "background_layer",
            this.backgroundTileset2,
            0,
            0
        );

        this.tileset2 = this.level2map.addTilesetImage("castle_tilesheet", "castle-tileset");
        this.groundLayer = this.level2map.createStaticLayer(
            "groundLayer",
            this.tileset2,
            0,
            0
        );

        this.furnitureTileset2 = this.level2map.addTilesetImage("castle_tilesheet", "castle-tileset");
        this.furniture_layer = this.level2map.createStaticLayer(
            "furniture_layer",
            this.furnitureTileset2,
            0,
            0
        );

        this.groundLayer.setCollisionByExclusion(-1, true);
    }

    customCursor(){ 
        this.cursors = this.input.keyboard.addKeys({
            up:Phaser.Input.Keyboard.KeyCodes.W,
            down:Phaser.Input.Keyboard.KeyCodes.S,
            left:Phaser.Input.Keyboard.KeyCodes.A,
            right:Phaser.Input.Keyboard.KeyCodes.D,
        });
    }

    playAudio(){
        this.gameMusic = this.sound.add("level2song");
        //loops
        this.gameMusic.loop = true;
        this.gameMusic.play();
        //adjusts audio
        this.gameMusic.volume = 0.5;

        //puts the jump sound in
        this.jumpSound = this.sound.add("jumpSound");
        this.jumpSound.volume = 0.5;
        
        this.collectCoinSound = this.sound.add("collectCoinSound");
        this.collectCoinSound.volume = 0.5;
    }

    createCamera(){
        this.camera = this.cameras.main;
        //camera zoom
        this.camera.setZoom(1.5); 
        this.cursors = this.input.keyboard.createCursorKeys();

        this.camera.setBounds(
            0,
            0,
            this.level2map.widthInPixels,
            this.level2map.heightInPixels
        );
        this.physics.world.setBounds(
            0,
            0,
            this.level2map.widthInPixels,
            this.level2map.heightInPixels
        );
    }

    createPlayer(){ 
        this.player = this.physics.add.sprite(50, 110, "player");
        this.player.setGravityY(900);
        this.isPlayerAlive = true;
        this.player.score = 35;
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
            frameRate: 12,
            repeat: 1,
        });
         
    //player collision with ground layer
    this.physics.add.collider(this.player, this.groundLayer);
    //camera following the player
    this.cameras.main.startFollow(this.player);
    }

    //Gravity bug is fixed in this level
    movePlayer(){ 
        if(this.cursors.left.isDown){
            this.player.setVelocityX(-350);
            this.player.flipX=true; //makes him go left
            this.player.anims.play("right", true);

        } else if(this.cursors.right.isDown){
            this.player.setVelocityX(350);
            this.player.flipX=false; //makes him go right
            this.player.anims.play("right", true);

        } else if(this.cursors.down.isDown){
            this.player.setVelocityY(350);

        } else if(this.cursors.up.isDown && this.player.body.onFloor()){ //jump
            this.player.anims.play("jump", true);
            this.player.setVelocityY(-500);
            this.jumpSound.play();

        } else {
            this.player.anims.play("idle", true);
            this.player.setVelocityX(0);
        }
    }

    createPotion(){
        this.potion = this.physics.add.group({
            allowGravity: true,
            immovable: true,
        });
        const potionObject = this.level2map.getObjectLayer('potion')['objects'];
        
        potionObject.forEach(potionObject => {
            const potion = this.potion.create(potionObject.x, potionObject.y - potionObject.height, 'potion').setOrigin(0,0);
        });

        this.physics.add.overlap(
            this.player,
            this.potion,
            this.collectPotion,
            null,
            this
        ); 
    }

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

    //creates the boss
    createBoss(){
        this.boss = this.physics.add.sprite(510, 1120, "bossIdle");
        this.boss.setGravityY(900);
        this.bossIsAlive = true;
        this.bossHp = 5000;
        this.boss.setScale(5);
        this.boss.scaleX = 10;
        this.boss.displayWidth = game.config.width*.1; this.boss.scaleY=this.boss.scaleX;

        //animations
        this.anims.create({
            key: "bossRunAnim",
            frames: this.anims.generateFrameNumbers("bossRun"),
            frameRate: 20,
            repeat: -1            
        });

        this.anims.create({
            key: "bossJumpAnim",
            frames: this.anims.generateFrameNumbers("bossJump"),
            frameRate: 20,
            repeat: -1            
        });

        //collider with world
        this.boss.setCollideWorldBounds(true);

        //Collision
        this.physics.add.overlap(
            this.player,
            this.boss,
            this.collisionChecker,
            null,
            this
        );
    }

    //boss movement
    moveBoss(){
        this.boss.x += this.speed;

        //this will move the boss. Could be imporved and written more efficiently with a switch statment maybe?
        if(this.boss.x >= 1000){
            this.speed = -10;
            this.boss.x += this.speed;
            this.boss.play("bossRunAnim");
            this.boss.flipX = true;
            
            //flips him
        } else if(this.boss.x <= 100){
            this.speed = 10;
            this.boss.x += this.speed;
            this.boss.play("bossRunAnim");
            this.boss.flipX = false;
        }

        //makes him jump
        if(this.boss.body.onFloor()){
            this.bossCounter ++;
            this.boss.body.setVelocityY(-600);
            this.boss.play("bossJumpAnim");
        }
      
        //if the boss counter is 5 he begins to run
        if(this.bossCounter >= 5){
            this.boss.body.setVelocityY(0);
            this.boss.x += this.speed + 2;
        }

        //if it's greater than or = 250 he jumps again an resets boss counter
        if(this.bossCounter >= 250){
            this.bossCounter = 0;
            console.log(this.bossCounter);
        }
        
    }

    //creates enemies
    createEnemies(){
        this.enemies = this.physics.add.group()

        var groundEnemy = new GroundEnemy (this, 526, 302);
        var groundEnemy = new GroundEnemy (this, 738, 302);
        var groundEnemy = new GroundEnemy (this, 1102, 574);
        var groundEnemy = new GroundEnemy (this, 592, 574);


        this.physics.add.overlap(
            this.player,
            this.enemies,
            this.collisionChecker,
            null,
            this
        );
    }

    makeBullets(){
        this.bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 7,
            runChildUpdate: true
        });
        this.bullet;
        this.lastShot = 0;


        //collider
        this.physics.add.overlap(
            this.bullets,
            this.boss,
            this.bulletBossCollision,
            null,
            this
        );

        this.physics.add.overlap(
            this.bullets,
            this.enemies,
            this.groundBulletEnemyCollision,
            null,
            this
        );

        // this.physics.add.overlap(
        //     this.bullets,
        //     this.boss,
        //     this.groundBulletEnemyCollision,
        //     null,
        //     this
        // );
    }

    //the infinity Sphere power up
    createInfinitySphere(){
        this.infinitySphere = this.physics.add.group({
            allowGravity: true,
            immovable: true,
        });
        const infinitySphereObject = this.level2map.getObjectLayer('infinitySphere')['objects'];
        
        infinitySphereObject.forEach(infinitySphereObject => {
            const infinitySphere = this.infinitySphere.create(infinitySphereObject.x, infinitySphereObject.y - infinitySphereObject.height, 'infinitySphere').setOrigin(0,0);
        });

        this.physics.add.overlap(
            this.player,
            this.infinitySphere,
            this.collectInfinitySphere,
            null,
            this
        ); 
    }

    //collection of the sphere
    collectInfinitySphere(player, infinitySphere){
        //for loop adds the health
        this.bullets.maxSize =+ 150;
        infinitySphere.disableBody(true, true);
        console.log("collected Infinity Sphere");
    }
 
    shootBullet(time, delta){
        if (this.input.activePointer.isDown) {
        
            this.bullet = this.bullets.get();
              
            if (this.bullet)
            {
                this.bullet.shoot(this.player.x, this.player.y);
                this.lastFired = time + 50;
                this.shootSound = this.sound.add("shootSound");
                this.shootSound.play();
                this.shootSound.volume = 0.1;
            }
          }
          
    }

    //boss/ player collision
    collisionChecker(player, boss){
        if (this.player.x.y == this.boss.x.y){
            //takes players health
            this.playerHealth = this.playerHealth - 2.0;  
            }
        if (this.playerHealth <= 0){
            this.isPlayerAlive = false;
        }
        console.log("Collision Detected");
    }

    //bullet/boss collision
    bulletBossCollision(bullet, boss){
        //takes boss hp
        this.bossHp = this.bossHp -1;
        
        //disables the boss body and sets boss alive to false
        if(this.bossHp <= 0){
            this.boss.disableBody(true, true);
            this.bossIsAlive = false;
            this.player.score = this.player.score + 20;
        }
    }

    //brings it to the game over scene
    gameOver() {
        if(this.isPlayerAlive == false){
            this.scene.start("GameOver");
            this.music = this.sound.add("gameOverSound");
            this.music.play();
            this.gameMusic.stop();
        }

        //brings to win scene when the boss dies
        if(this.bossIsAlive == false){
            this.scene.start("Win", {score: this.player.score});
            this.music = this.sound.add("gameOverSound");
            this.music.play();
            this.gameMusic.stop();
        }
    }

    //bullet/enemy collision
    groundBulletEnemyCollision(bullet, enemy){
        enemy.play("groundEnemyDeathAnim");
        enemy.destroy();
    }

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

    playerHp(){
        var test = 20;
        this.hpText.setText("HP: " + this.playerHealth);
        
        //follow player
        this.hpText.x = this.player.body.position.x - 25;
        this.hpText.y = this.player.body.position.y - 20;

        this.scoreText.x = this.player.body.position.x - 40;
        this.scoreText.y = this.player.body.position.y - 45;
    }

    scoreUpdate(){
        this.scoreText.setText("Score: " + this.player.score);
        this.hpText.setText("Hp: " + this.playerHealth);
    }
}