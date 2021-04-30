var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
var performance = 0;
var disp = document.getElementById("performance");

import {Tilemap} from "./objects/Tilemap.js";
import {Player} from "./objects/player.js";
import { ParticleEffect } from "./objects/Entitys/Particle Effect.js";
//import {ParticleSystem} from "./objects/Components/Particle System.js";

class testEntity extends Entity{
    start(){
        this.loadImage("./assets/tiles/wall.png");
        this.size = new Vector(100,100);
    }
    update(){
        drawImage(this.asset, this.position, this.size);
    }
}

class Game{
    constructor(){
        this.running = true;
        this.fps = 60;
        this.player = new Player(0,0);
        this.tilemap = new Tilemap(this.player);
        tilemap = this.tilemap;
        this.Entitys = [];
        this.start();
        this.time = 0;
    }
    start(){
        //pollinput
        canv.addEventListener("click", this.onClick.bind(this));
        setInterval(this.update.bind(this), 1000/this.fps);
    }
    update(){
        deltaTime = Date.now()-this.time;
        deltaTime/=1000;
        performance = 1/deltaTime;
        this.displayPerfromance();
        this.time = Date.now();
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canv.width,canv.height);

        this.tilemap.draw();

        for(var i = 0; i < this.Entitys.length; i++){
            this.Entitys[i].update();
        }

        this.player.update();
    }
    onClick(event){
        //var pos = this.tilemap.toWorldSpace(event.clientX, event.clientY);
        //this.Entitys.push(new testEntity(pos.x, pos.y))
        this.player.onClick(event.clientX, event.clientY, event);
    }
    displayPerfromance(){
        disp.innerHTML = "fps: "+performance
        +"\nworld seed: "+currentSeed
        +"\ncurrentChunk: "+Math.floor(this.player.position.x/(64))+", "+Math.floor(this.player.position.y/(64));
    }
}

var game_instance = new Game();