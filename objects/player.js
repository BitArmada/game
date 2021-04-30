var ctx = canv.getContext('2d');
import {Inventory} from "../items/Inventory.js";
import {ball, rock, stick, Pistol, bullet} from "../items/items.js";

class Player{
    constructor(x, y){
        this.position = new Vector(x, y);
        this.velocity = new Vector();
        this.Inventory = new Inventory();
        this.acceleration = 0.7;
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
        this.drawItem();
    }
    onClick(x, y, event) {
        this.Inventory.useSelectedItem(event);
    }
    drawItem(){
        var item = this.Inventory.getSelectedItem();
        if(item){
            ctx.drawImage(item.asset, this.screenCords.x-(item.size.x/2)-(this.size.x/9), this.screenCords.y-(item.size.y/2)+(this.size.y/10), item.size.x, item.size.y);
        }
    }
}

export {Player};