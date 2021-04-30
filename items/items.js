import {placeableItem} from "./templates/placeableItem.js";
//import {particleShot} from "./templates/particleShot.js";
import {Item} from "./item.js";
import { Player } from "../objects/player.js";

class ball extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/ball.png";
    }
    use(event){
        //var pos = tilemap.toWorldSpace(event.clientX, event.clientY);
        //game_instance.add(new particleShot(pos.x, pos.y, "./assets/items/ball.png"));
    }
}

class bullet extends Entity{
    constructor(x, y){
        super(player.position.x, player.position.y);

        //config
        this.SPRED = 0.1; // how much the bullets spread
        this.SPEED = 15;
        this.RANGE = 40; //maximum distance the bullet can travel before destroying itself
        this.BLOOM = 15;
        this.COLOR = "#ffa200";

        this.dir = new Vector(x, y);
        this.dir = this.dir.subtract(this.position);

        //calculate and add spred
        this.spredVec = randomVector(this.SPRED).multiply(this.dir.magnitude());
        this.dir.add(this.spredVec);

        this.velocity = this.dir.normalize();
        this.size = new Vector(5,25);
    }
    start(){
    }
    update(){
        this.position.add(this.velocity.multiply(deltaTime*this.SPEED));
        //ctx.filter = "blur(1px)";
        ctx.shadowBlur = this.BLOOM;
        ctx.shadowColor = this.COLOR;
        fillRectRotated(this.position, this.size, this.COLOR, vecToRot(this.dir));
        ctx.shadowBlur = 0;
        //ctx.filter = "none";
        this.checkDistance();
    }
    checkDistance(){
        //check how far away from player so and 
        if(getDist(player.position.x, player.position.y, this.position.x, this.position.y)> this.RANGE){
            game_instance.remove(this);
        }
    }
}
class Pistol extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/pistol.png";
    }
    use(event){
        var pos = tilemap.toWorldSpace(event.clientX, event.clientY);
        game_instance.add(new bullet(pos.x, pos.y));
        /*for(var i = 0; i < 10; i++){
            game_instance.add(new bullet(pos.x, pos.y));
        }*/
    }
}
class rock extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/rock.png";
    }
    use(event){
        var pos = tilemap.toWorldSpace(event.clientX, event.clientY);
        game_instance.add(new placeableItem(pos.x, pos.y, "./assets/items/rock.png"));
    }
}
class stick extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/stick.png";
        //game.add(new testEntity(0,0));
    }
}


export {ball, rock, stick, Pistol, bullet};