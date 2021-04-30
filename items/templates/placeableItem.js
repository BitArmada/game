class placeableItem extends Entity{
    constructor(x, y, src){
        super(x, y);
        this.loadImage(src);
        this.size = new Vector(100,100);
    }
    start(){
    }
    update(){
        drawImage(this.asset, this.position, this.size);
    }
}
export {placeableItem};