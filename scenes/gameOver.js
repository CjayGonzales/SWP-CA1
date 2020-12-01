class GameOverScene extends Phaser.Scene{
    constructor(){
        super('GameOver');
    }

    init(){
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create(){
        //create title text
        this.titleText = this.add.text(this.scaleW/2, this.scaleH/2, 'Game Over', {fontSize: '78px', fill: '#fff'});
        this.titleText.setOrigin(0.5);

        //play again button
        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH * 0.65, 'button1', 'button2', 'Play again', this.startScene.bind(this, 'Title'));
        console.log(this.titleText)
    }

    //starts the next scene
    startScene(targetScene) {
        this.scene.start(targetScene);

    }
}