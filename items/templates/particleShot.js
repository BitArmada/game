import {ParticleEffect} from './objects/Entitys/Particle Effect,js';

class placeableItem extends Entity{
    constructor(x, y, src){
        super(x, y);
        this.loadImage(src);
        this.size = new Vector(100,100);
        this.effect = new ParticleEffect(this.position.x, this.position.y);
    }
    start(){
    }
    update(){
        drawImage(this.asset, this.position, this.size);
    }
}
export {placeableItem};