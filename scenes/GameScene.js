//13: Physics
class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.playerSpeed = 1.5;
    this.enemyMaxY = 280;
    this.enemyMinY = 80;

    this.score = 0;

    this.scaleW = this.sys.game.config.width;
    this.scaleH = this.sys.game.config.height;
  }

  create() {
    this.createAudio();
    this.createInput();
    this.createBackground();
    this.createPlayer();
    this.createTreasures();
    this.createEnemies();
    this.createText();
  }

  createAudio() {
    //play background loopFull
    // Adding Sounds
    this.music = this.sound.add("bgmusic");
    this.music.play();
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createBackground() {
    // create bg sprite
    this.bg = this.add.sprite(0, 0, "background");
    // change the origin to the top-left corner
    this.bg.setOrigin(0, 0);
  }

  createPlayer() {
    //13: add  player sprite to physics engine
    this.player = this.physics.add.sprite(50, this.scaleH / 2, "dude");
    this.isPlayerAlive = true;
    this.isPlayerWinning = false;
    this.player.score = 0;
    this.player.treasures = 0;
    //this.player.body.setGravityY(-30);
    //this.player.setCollideWorldBounds(true)

    // animation states
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [
        {
          key: "dude",
          frame: 4,
        },
      ],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  createTreasure() {
    // goal
    this.treasure = this.add.sprite(
      this.scaleW - 80,
      this.scaleH / 2,
      "treasure"
    );
    this.treasure.setScale(0.6);
  }

  createEnemies() {
    //13: add  enemy sprites to physics system
    this.enemies = this.physics.add.group({
      key: "enemy",
      repeat: 2,
      score: 5,
      setXY: {
        x: 110,
        y: 160,
        stepX: 150,
        stepY: 20,
      },
    });

    // scale enemies down
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

    // set random speeds for all children of enemies group
    Phaser.Actions.Call(
      this.enemies.getChildren(),
      function (enemy) {
        enemy.speed = Math.random() * 1 + 1;
      },
      this
    );

    //13: add a collider between player and enemies
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.collisionCheck,
      null,
      this
    );

    //13: add a collider between player and treasures
    this.physics.add.overlap(
      this.player,
      this.treasures,
      this.collectTreasures,
      null,
      this
    );

  }

  createTreasures() {
    //11: add  physics to group
    this.treasures = this.physics.add.group({
      key: "treasure",
      repeat: 2,
      score: 5,
      setXY: {
        x: 180,
        y: this.scaleH / 2,
        stepX: 150,
        stepY: 0,
      },
    });

    // scale treasures down
    Phaser.Actions.ScaleXY(this.treasures.getChildren(), -0.5, -0.5);

    //13: add a collider between player and treasures
    this.physics.add.overlap(
      this.player,
      this.treasures,
      this.collectTreasures,
      null,
      this
    );
  }

  createText() {
    

    /*this.scoreText = this.add.text(16, 16, "score: 0", {
      fontSize: "32px",
      fill: "#f00",
    });*/
    //13 bitmapFont
    this.scoreText = this.add.bitmapText(16, 16, 'bmFont', 'score: 0');
    this.scoreText.setScale(0.5);
    this.scoreText.setTint(0xff0000, 0xffffff, 0xff0000,0xffffff);
  }

  //gameLoop
  update() {

     //08: check is player isPlayer dead -> exit the update loop
     //13: check Player has won -> exit the update loop
     if (!this.isPlayerAlive || this.isPlayerWinning) {
      return;
      this.gameOver();
    }

    

    //console.log("gameloop");

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-100);
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(100);
      this.player.anims.play("right", true);
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("turn");
    }
    console.log(this.player.score);
    //11: add a score to the game
    this.scoreText.setText("score: " + this.player.score);

   
    // check for active input
    if (this.input.activePointer.isDown) {
      // player walks
      this.player.x += this.playerSpeed;
    }

    // treasure collision
    //if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.treasure.getBounds())) {
    //  this.gameOver();
    //}

    // 06: dragon movement up and down
    // 07: add collision detection for each member of the enemies group
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;

    for (let i = 0; i < numEnemies; i++) {
      // move enemies
      enemies[i].y += enemies[i].speed;

      // reverse movement if reached the edges
      if (enemies[i].y >= this.enemyMaxY && enemies[i].speed > 0) {
        enemies[i].speed *= -1;
      } else if (enemies[i].y <= this.enemyMinY && enemies[i].speed < 0) {
        enemies[i].speed *= -1;
      }

      // old  07: enemy collision
      /*
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemies[i].getBounds())) {

        this.gameOver();
        break;
      }
      */
    }
  }

  //12: new collision check
  collisionCheck(player, enemy) {
    console.log("overlapping now");
    this.isPlayerAlive = false;
    player.disableBody(true, true);
    this.gameOver();
  }

  //12: new collision check
  collectTreasures(player, treasure) {
    console.log("treasure collected");
    this.player.treasures ++;
    this.player.score = 5  * this.player.treasures;
    treasure.disableBody(true, true);
    this.checkWinCondition(this.player.treasures);
  }

  //13: winConditionCheck
  checkWinCondition(howManyChests) {
    console.log("checking Win")
    if (howManyChests == 3) {
      console.log("You won!");
      this.isPlayerWinning = true;
      this.scene.start("Win", {score: this.player.score});
    }
    
  }

  gameOver() {
    console.log("hello from gameOver")
    this.scene.start("GameOver");
  }
}
