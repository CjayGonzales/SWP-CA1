class GameOverScene extends Phaser.Scene {
  constructor(s) {
    super('GameOver');
    
  }

  init() {
    this.scaleW = this.sys.game.config.width; 
    this.scaleH = this.sys.game.config.height; 
  }

  create() {
    // create title text
   // this.titleText = this.add.text(, 'Game Over', { fontSize: '64px', fill: '#fff' });
       //13 bitmapFont
      this.titleText = this.add.bitmapText(this.scaleW / 2, this.scaleH / 2 -50, 'bmFont', 'Game Over');
      this.titleText.setOrigin(0.5);
      this.titleText.setScale(0.5);
      this.titleText.setTint(0xff0000,0xff0000, 0xffffff, 0xffffff);
    

    // create the Play game button
    this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH * 0.65, 'button1', 'button2', 'Play again', this.startScene.bind(this, 'Title'));
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
