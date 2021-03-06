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
        this.calculateMovments();
        this.checkCollision();
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
    calculateMovments(){
        //check if a gampad exists and if so then dont do normal wasd controlls
        if(gamepads.length == 0){
            //vertical
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
            //horizontal
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
        }else{
            //gamepad is connected
            this.scangamepads();
            var horizontal = gamepads[0].axes[0];
            var vertical = gamepads[0].axes[1];
            this.velocity.x += this.acceleration*deltaTime*horizontal;
            this.velocity.y += this.acceleration*deltaTime*vertical;

            //dont allow to go over maxSpeed
            if(this.velocity.x > this.maxSpeed){
                this.velocity.x = this.maxSpeed;
            }else if(this.velocity.x < -this.maxSpeed){
                this.velocity.x = -this.maxSpeed;
            }
            if(this.velocity.y > this.maxSpeed){
                this.velocity.y = this.maxSpeed;
            }else if(this.velocity.y < -this.maxSpeed){
                this.velocity.y = -this.maxSpeed;
            }

            //if input close to 0 start slowing down
            if(Math.round(horizontal * 10)/10 == 0){
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
            if(Math.round(vertical * 10)/10 == 0){
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
        }
    }
    scangamepads() {
        var gps = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
        for (var i = 0; i < gps.length; i++) {
          if (gps[i]) {
            if (gps[i].index in gamepads) {
              gamepads[gps[i].index] = gps[i];
            } else {
            }
          }
        }
    }
    checkCollision(){
        var nPosition = new Vector(); // the next position of the player

        nPosition.x = this.position.x+this.velocity.x; 
        nPosition.y = this.position.y+this.velocity.y; // set next position to the current position + velocity

        var collision_tile = tilemap.getTile(Math.floor(this.position.x), Math.floor(this.position.y)); // the tile the player will be on
        collision_tile.onCollision(); // trigger collision event for tile instance

        if(this.velocity.x >= 0 || this.velocity.x < 0){
            if(tilemap.getTile(Math.floor(nPosition.x), Math.floor(this.position.y)).collidable){
                this.velocity.x = 0;
            }
        }
        if(this.velocity.y >= 0 || this.velocity.y < 0){
            if(tilemap.getTile(Math.floor(this.position.x), Math.floor(nPosition.y)).collidable){
                this.velocity.y = 0;
            }
        }
    }
}

export {Player};