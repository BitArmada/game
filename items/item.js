var ITEM_PICKUP_RANGE  = 3;
var GLOBAL_MAX_STACK_HEIGHT = 999;
class Item{
    constructor(){
        this.position = new Vector();
        this.velocity = new Vector();
        this.asset = new Image();
        this.size = new Vector(24, 24);
        this.reusable = true; // item will not be removed after it is used
        this.quantity = 1;
        this.maxStackHeight = 64; //for particular item
        this.description = "untitled \n this item has no information";
    }
    update(){
        //for pets cool movement
        //this.velocity = this.velocity.multiply(0.01*getDist(player.position.x, player.position.y, this.position.x, this.position.y)); for pets
        if(getDist(player.position.x, player.position.y, this.position.x, this.position.y)<ITEM_PICKUP_RANGE){
            this.velocity = player.position.subtract(this.position).normalize();
            this.velocity = this.velocity.multiply(0.04);
            this.position.add(this.velocity);
            if(getDist(player.position.x, player.position.y, this.position.x, this.position.y)<0.2){
                player.Inventory.add(this);
                game_instance.remove(this);
            }
        }
        drawImage(this.asset, this.position, this.size);
    }
}

export {Item};