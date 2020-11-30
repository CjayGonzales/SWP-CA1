class UiScene extends Phaser.Scene{
constructor(){
    super('Ui');
}

int(){
    this.gameScene = this.scene.get('playGame');
}

create(){
    this.setupUiElements();
    this.setupEvents();
}

setupUiElements(){
    this.scoreText = this.add.text(35, 8, 'Coins: 0', {fontSize: '16px', fill: '#fff'});
}

setupEvents(){
    this.gameScene.events.on('updateScore', (score) =>{
        this.scoreText.setText(`Coins: ${score}`);
    });
}

}