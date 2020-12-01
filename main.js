let gameScene = new Phaser.Scene("Game");

var gameSettings = {
  playerSpeed: 200,
}

// set the configuration of the game
let config = {
  type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
  width: 1300,
  height: 1000,
  scene: [bootupScene, TitleScene, helpScene, GameOverScene, level1, level2, winScene, options],
  physics: {
    default: "arcade",
    arcade:{
      debug: false,
      gravity:{
        y:0,
      }
    }
  }
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);