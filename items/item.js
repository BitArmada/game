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

export {Item};