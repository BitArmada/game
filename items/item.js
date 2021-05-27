class Item{
    constructor(){
        this.position = new Vector();
        this.asset = new Image();
        this.size = new Vector(24, 24);
        this.description = "untitled \n this item has no information";
    }
    draw(){
        drawImage(this.asset, this.position, this.size);
    }
}

export {Item};