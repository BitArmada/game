var ctx = canv.getContext('2d');
class Player{
    constructor(x, y){
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.acceleration = 1;
        this.size = new Vector(100,100);
        this.maxSpeed = 0.15;
        this.asset = new Image();
        this.asset.src = "./assets/character.png";
        this.direction;
        this.screenCords;
    }
    start(){}
    update(){
        if(up){
            this.velocity.y -= this.acceleration*deltaTime;
            if(this.velocity.y < -this.maxSpeed){
                this.velocity.y = -this.maxSpeed;
            }
        }else if(down){
            this.velocity.y += this.acceleration*deltaTime;
            if(this.velocity.y > this.maxSpeed){
                this.velocity.y = this.maxSpeed;
            }
        }else{
            if(this.velocity.y < 0){
                this.velocity.y += this.acceleration*deltaTime;
                if(this.velocity.y >= 0){
                    this.velocity.y = 0;
                }
            }else{
                this.velocity.y -= this.acceleration*deltaTime;
                if(this.velocity.y <= 0){
                    this.velocity.y = 0;
                }
            }
        }
        if(left){
            this.velocity.x -= this.acceleration*deltaTime;
            if(this.velocity.x < -this.maxSpeed){
                this.velocity.x = -this.maxSpeed;
            }
            this.dir = -1;
        }else if(right){
            this.velocity.x += this.acceleration*deltaTime;
            if(this.velocity.x > this.maxSpeed){
                this.velocity.x = this.maxSpeed;
            }
            this.dir = 1;
        }else{
            if(this.velocity.x < 0){
                this.velocity.x += this.acceleration*deltaTime;
                if(this.velocity.x >= 0){
                    this.velocity.x = 0;
                }
            }else{
                this.velocity.x -= this.acceleration*deltaTime;
                if(this.velocity.x <= 0){
                    this.velocity.x = 0;
                }
            }
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