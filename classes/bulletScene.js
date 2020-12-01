class Bullet extends Phaser.GameObjects.Image {
    constructor(scene){
        super(scene);
        this.scene = scene;
        Phaser.GameObjects.Image.call(this, scene, 0,0, 'bullet');
        this.speed = Phaser.Math.GetSpeed(250 , 1);
    }
    
    //shoot bullets
    shoot(x, y){
        this.setPosition(x+20, y);
        this.setActive(true);
        this.setVisible(true);
    }

    //speed of the bullets
    update(time, delta){
        this.x += this.speed * delta;
        //changes the range of the bullet
        if (this.x > 1300){
            this.setActive(false);
            this.setVisible(false);
        }

        //i tried to destroy the bullet if it hits the wall. didnt work 
        if(this.body.onWall()){
            this.destroy();
        }
    }
}