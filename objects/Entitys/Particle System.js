/*class ParticleSystem extends Component{
    start(){
        this.particles = [];
    }
    update(){
        var pos = this.getPos();
        this.particles.push(new Particle(pos.x, pos.y));
        this.particles[this.particles.length-1].start();
        for(var i =0; i < this.particles.length; i++){
            this.particles[i].update();
        }
    }
}
class Particle extends Entity{
    start(){
        console.log("lskdjflsdfj")
        this.loadImage("./assets/test entity.png");
        this.velocity = randomVector();
        this.size = this.size.multiply(Math.random());
        this.add(renderingComponent);
    }
}

export {ParticleSystem};*/