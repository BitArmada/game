var ctx = canv.getContext('2d');
class Player{
    constructor(x, y){
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.size = new Vector(100,100);
        this.speed = 0.1;
        this.asset = new Image();
        this.asset.src = "./assets/character.png";
        this.direction;
        this.screenCords;
    }
    start(){}
    update(){
        this.velocity.x = 0;
        this.velocity.y = 0;
        if(up){
            this.velocity.y = -this.speed;
        }else if(down){
            this.velocity.y = this.speed;
        }
        if(left){
            this.velocity.x = -this.speed;
            this.dir = -1;
        }else if(right){
            this.velocity.x = this.speed;
            this.dir = 1;
        }
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        setPixeleated();
        this.screenCords = tilemap.toScreenSpace(this.position.x, this.position.y);
        if(this.dir>0){
            ctx.save();
            ctx.scale(-1, 1);
            ctx.drawImage(this.asset, -(this.screenCords.x-(this.size.x/2)), (this.screenCords.y-(this.size.y/2)), this.size.x*-1, this.size.y);
            ctx.restore();
        }else{
            ctx.drawImage(this.asset, this.screenCords.x-(this.size.x/2), this.screenCords.y-(this.size.y/2), this.size.x, this.size.y);
        }
    }
    onClick(x, y) {
    }
}

export {Player};