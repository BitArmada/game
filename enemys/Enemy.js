class Enemy extends Entity{
    constructor(x, y){
        super(x, y);
        this.animation = {
            animated: false,
            frames: 1,
            time: 0,
            frame: 0,
            size: new Vector(16, 16), //size in pixels of one frame
            p: new Vector(), // current position 
            speed: 10,
        }
    }
    update(){
    }
    animate(){
        if(this.animation.animated){
            this.animation.time++;
            this.animation.frame = Math.round(this.animation.time/this.animation.speed);
            this.animation.p.x = (this.animation.frame%this.animation.frames)*this.animation.size.x;    
        }
    }
}

export {Enemy};