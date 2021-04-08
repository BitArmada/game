var ctx = canv.getContext('2d');
class Entity{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.size = new Vector(100,100);
        this.asset = new Image();
        this.screenCords = new Vector();
        this.start();
    }
    loadImage(src){
        this.asset.src = src;
    }
    start(){}
    update(){
        setPixeleated();
        this.screenCords = tilemap.toScreenSpace(this.x, this.y);
        ctx.drawImage(this.asset, this.screenCords.x-(this.size.x/2), this.screenCords.y-(this.size.y/2), this.size.x, this.size.y);
    }
}

export {Entity};