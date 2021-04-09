class ParticleEffect{
    constructor(x, y, particle){
        this.particles = [];
        this.position = new Vector(x, y);
        this.running = true;
        this.duration = 0.01;
        this.startTime = Date.now();
        this.looping = false;
        this.lifetime = 2;
        //maximum particles
        this.MAX_PARTICLES = 1000;
        //how many particles are created per frame
        this.emition = 100;
        if(particle){
            this.particle = particle;
        }else{
            this.particle = Particle;
        }
    }
    start(){
        this.startTime = Date.now();
    }
    update(){
        for(var i = 0; i < this.emition; i++){
            if(this.particles.length < this.MAX_PARTICLES&&(this.running||this.looping)){
                this.particles.push(new this.particle(this.position.x, this.position.y));
            }
        }
        for(var i = 0; i < this.particles.length; i++){
            var p = this.particles[i];
            p.update();
            if(p.isDestroyed()){
                //remove p from Array
                this.particles.splice(i, 1);
            }
        }
        if(Date.now()-this.startTime>(this.duration*1000)){
            this.running = false;
        }
    }
}
class Particle extends Entity{
    start(){
        this.loadImage("./assets/particles/fireTest.png");
        this.velocity = randomVector();
        this.size = new Vector(8, 10);
        //this.size = this.size.multiply(Math.random());
        this.speed = 10;
        this.lifetime = 0;
        this.sprite = 0;
    }
    update(){
        this.size.subtractUnit(0.5);
        this.position.add(this.velocity.multiply(deltaTime*this.speed));
        this.sprite = Math.round((this.size.x/8)*2)-1;
        drawImage(this.asset, this.position, this.size, {x: 0, y: 10*this.sprite}, {x: 8, y: 8});
    }
    isDestroyed(){
        return (this.size.x<0||this.size.y<0);
    }
}

export {ParticleEffect};