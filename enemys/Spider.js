import {Enemy} from './Enemy.js';

class Spider extends Enemy{
    constructor(x, y){
        super(x, y);

        //config
        this.SPEED = 1;

        this.loadImage("../assets/Enemys/spider.png");
        this.size = new Vector(50,50);

        this.animation.animated = true;
        this.animation.frames = 3;
        this.animation.speed = 5;
    }
    update(){
        this.velocity = player.position.subtract(this.position).normalize();
        this.position.add(this.velocity.multiply(this.SPEED*deltaTime));

        this.animate();
        drawImageRotated(this.asset,this.position, this.size, vecToRot(this.velocity), this.animation.p, this.animation.size);
    }
}

export {Spider};