class GroundEnemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y){
        super(scene, x, y);
        this.scene = scene;
        this.x = x;
        this.y = y;
        scene.add.existing(this);
        scene.enemies.add(this);
        
        this.speed = 100;
        this.body.setGravityY(200);
      
        scene.anims.create({
          key:"groundEnemyAnim",
          frames: scene.anims.generateFrameNumbers("groundEnemy"),
          frameRate: 6,
          repeat: -1 
        });
        this.play("groundEnemyAnim");

        scene.anims.create({
          key:"groundEnemyDeathAnim",
          frames: scene.anims.generateFrameNumbers("groundEnemyDeath", {
            start: 0,
            end: 8
          }),
          frameRate: 20,
          repeat: 0
        });
    }

    update(){
        // changes the velocity
        if(this.flipX){
          this.body.velocity.x = this.speed;
        }else{
          this.body.velocity.x = -this.speed;
        }
    
        // turn around when they're touching walls
        if(this.body.onWall()){ 
          if(this.flipX){
            this.flipX = false;
            this.x -= 5;
          } else{
            this.flipX = true;
            this.x += 5;
          }
    
        }
    
    }
}