class winScene extends Phaser.Scene{
    constructor(){
        super('Win');
    }

    init(){
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create(data){
        //create title text
        this.titleText = this.add.text(this.scaleW * 0.35, this.scaleH * 0.35, 'You Win!', {fontSize: '78px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW/2, this.scaleH * 0.50, 'Your score:' + data.score, {fontSize: '78px', fill: '#fff'});
        this.titleText.setOrigin(0.5);

        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH * 0.75, 'button1', 'button2', 'Play again?', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
      }
}