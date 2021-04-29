class Item{
    constructor(){
        this.position = new Vector();
        this.asset = null;
        this.size = new Vector(50, 50);
    }
    draw(){
        drawImage(this.asset, this.position, this.size);
    }
}

class ball extends Item{

}

export {ball};