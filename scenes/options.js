class options extends Phaser.Scene{
    constructor(){
        super('Options');
    }
    init(){
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
        this.musicStopper = false;
    }

    create(){
        this.playAudio();
         
        this.titleText = this.add.text(this.scaleW/2, this.scaleH/2, 'Optionmaton', {fontSize: '78px', fill: '#fff'});
        this.titleText.setOrigin(0.5);

        this.optionsButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.65, 'button1', 'button2', 'Audio On', this.togglePlay.bind(this, 'playGame'));
        this.soundButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.75, 'button1', 'button2', 'Audio Off', this.toggleShh.bind(this, 'playGame'));
        this.optionsButton = new UiButton(this,  this.scaleW / 2, this.scaleH * 0.85, 'button1', 'button2', 'Back', this.startScene.bind(this, 'Title'));
    }

    playAudio(){
        this.music = this.sound.add("menuSong");
        this.music.play();
    }

    startScene(targetScene){
        this.scene.start(targetScene);
        this.music.stop();
    }

    //mutes and plays audio in the options
    toggleShh(){
       game.sound.mute = true;
    }

    togglePlay(){
        game.sound.mute = false;
    } 

}