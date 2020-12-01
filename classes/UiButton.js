class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
      super(scene, x, y);
      this.scene = scene; //this scene
      this.x = x; // the x position
      this.y = y; // the y position
      this.key = key; // the background image
      this.hoverKey = hoverKey; // what's displayed when user hovers
      this.text = text; // the text
      this.targetCallback = targetCallback; // function thats called when you click
  
      
      this.createButton();
      this.scene.add.existing(this);
    }
  
    createButton() {
      // play game button
      this.button = this.scene.add.image(0, 0, 'button1');
      // make button interactive
      this.button.setInteractive();
      // scale the button
      this.button.setScale(1.4);
  
      // Button text
      this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });
      // center the button text inside the Ui button
      Phaser.Display.Align.In.Center(this.buttonText, this.button);
  
      // add the two game objects to our container
      this.add(this.button);
      this.add(this.buttonText);
  
      // event listeners
      this.button.on('pointerdown', () => {
        this.targetCallback();
      });
  
      this.button.on('pointerover', () => {
        this.button.setTexture(this.hoverKey);
      });
  
      this.button.on('pointerout', () => {
        this.button.setTexture(this.key);
      });

    }
  }