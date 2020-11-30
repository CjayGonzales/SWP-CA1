class helpScene extends Phaser.Scene{
    constructor(){
        super('Help');
    }

    init(){
        this.scaleW = this.sys.game.config.width;
        this.scaleH = this.sys.game.config.height;
    }

    create(data){
        //create text
        this.titleText = this.add.text(this.scaleW * 0.35, this.scaleH * 0.025, 'Controls:', {fontSize: '78px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.25, this.scaleH * 0.15, 'W -> Jump', {fontSize: '48px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.5, this.scaleH * 0.15, 'A -> Left', {fontSize: '48px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.25, this.scaleH * 0.25, 'S -> Down', {fontSize: '48px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.5, this.scaleH * 0.25, 'D -> Right', {fontSize: '48px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.17, this.scaleH * 0.32, 'Left Mouse button is to shoot', {fontSize: '48px', fill: '#fff'});

        this.titleText = this.add.text(this.scaleW * 0.35, this.scaleH * 0.42, 'Powerups:', {fontSize: '78px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.27, this.scaleH * 0.55, 'Potions: Restores 20 Health', {fontSize: '38px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.27, this.scaleH * 0.65, 'Coin: Increases your score', {fontSize: '38px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.23, this.scaleH * 0.75, 'Infinity Sphere: Ultimate Powerup', {fontSize: '38px', fill: '#fff'});
        this.titleText = this.add.text(this.scaleW * 0.5, this.scaleH * 0.85, 'Collect all coins in the first level and beat the boss in the next!', {fontSize: '28px', fill: '#fff'});
        
        this.titleText.setOrigin(0.5);

        //creates back button
        this.startGameButton = new UiButton(this, this.scaleW / 2, this.scaleH * 0.95, 'button1', 'button2', 'Back', this.startScene.bind(this, 'Title'));
    }

    startScene(targetScene) {
        this.scene.start(targetScene);
    }
}