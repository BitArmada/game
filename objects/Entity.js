var ctx = canv.getContext('2d');
class Entity{
    constructor(x, y){
        this.position = new Vector(x, y);
        this.size = new Vector(100,100);
        this.velocity = new Vector();
        this.screenCords = new Vector();
        this.asset = new Image();
        this.start();
    }
    start(){
    }
    update(){
    }
    drawImage(){
        setPixeleated();
        this.screenCords = tilemap.toScreenSpace(this.position.x, this.position.y);
        ctx.drawImage(this.asset, this.screenCords.x-(this.size.x/2), this.screenCords.y-(this.size.y/2), this.size.x, this.size.y);
    }
    loadImage(src){
        this.asset.src = src;
    }
}
/*
class Component{
    constructor(entity){
        this.perentEntity = entity;
        this.start();
    }
    start(){
    }
    update(){
    }
    getPos(){
        return this.perentEntity.position;
    }
    getSize(){
        return this.perentEntity.size;
    }
}
class renderingComponent extends Component{
    start(){
    }
    update(){
        if(this.perentEntity.asset.src == undefined){
            console.log("you forgot to load an image")
        }
        this.drawImage();
    }
    drawImage(){
        setPixeleated();
        this.screenCords = tilemap.toScreenSpace(this.perentEntity.position.x, this.perentEntity.position.y);
        ctx.drawImage(this.perentEntity.asset, this.screenCords.x-(this.perentEntity.size.x/2), this.screenCords.y-(this.size.y/2), this.size.x, this.size.y);
    }
}*/