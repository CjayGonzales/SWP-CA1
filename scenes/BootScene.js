class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    console.log("preloading");
    // load images
    this.loadImages();
    //13 load Bitmap text
    this.loadBitmapText();
    // load spritesheets
    this.loadSpriteSheets();
    // load audio
    this.loadAudio();
  }

  loadImages() {
    // load images
    this.load.image("background", "assets/background.png");
    this.load.image("player", "assets/player.png");
    this.load.image("enemy", "assets/dragon.png");
    this.load.image("treasure", "assets/treasure.png");
    this.load.image("button1", "assets/blue_button01.png");
    this.load.image("button2", "assets/blue_button02.png");
  }
  
  //13: loadBitmapText
  loadBitmapText() {
    this.load.bitmapFont('bmFont', 'assets/bitmapfonts/font.png', 'assets/bitmapfonts/font.fnt');
  }

  loadSpriteSheets() {
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  loadAudio() {
    // Adding Sounds
    this.load.audio("bgmusic", [
      "assets/bgmusic.mp3",
      "assets/bgmusic.ogg",
    ]);
  }

  create() {
    this.scene.start("Title");
  }
}
