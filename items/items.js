import {placeableItem} from "./templates/placeableItem.js";
//import {particleShot} from "./templates/particleShot.js";

class Item{
    constructor(){
        this.position = new Vector();
        this.asset = new Image();
        this.size = new Vector(24, 24);
    }
    draw(){
        drawImage(this.asset, this.position, this.size);
    }
}

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


export {ball, rock, stick};