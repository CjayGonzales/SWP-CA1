class TitleScene extends Phaser.Scene{
    constructor(){
        super('Title');
    }

    init(){
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
   
    }

    create(){
        this.playAudio();

        //displays the name of the game
        this.titleText = this.add.text(this.scaleW/2, this.scaleH/2, 'Automaton', {fontSize: '78px', fill: '#fff'});
        this.titleText.setOrigin(0.5);
       
        //buttons
        this.startGameButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.65, 'button1', 'button2', 'Start', this.startScene.bind(this, 'playGame'));
        this.startGameButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.75, 'button1', 'button2', 'Options', this.startScene.bind(this, 'Options'));
        this.startGameButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.85, 'button1', 'button2', 'Help', this.startScene.bind(this, 'Help'));
    }

    playAudio(){
        this.music = this.sound.add("menuSong");
        this.music.play();
        this.music.loop = true;
    }

    startScene(targetScene){
        this.scene.start(targetScene);
        this.music.stop();
    }
}