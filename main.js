var canv = document.getElementById("canv");
var ctx = canv.getContext("2d");
canv.width = window.innerWidth;
canv.height = window.innerHeight;
var deltaTime = 0;
var performance = 0;
var disp = document.getElementById("performance");

import {Tilemap} from "./objects/Tilemap.js";
import {Entity} from "./objects/Entity.js";
import {Player} from "./objects/player.js";

class testEntity extends Entity{
    start(){
        this.loadImage("./assets/test entity.png");
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
        document.addEventListener("click", this.onClick.bind(this));
        setInterval(this.update.bind(this), 1000/this.fps)
    }
    update(){
        deltaTime = Date.now()-this.time;
        performance = 1000/deltaTime;
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
        var pos = this.tilemap.toWorldSpace(event.clientX, event.clientY);
        this.Entitys.push(new testEntity(pos.x, pos.y))
        this.player.onClick(event.clientX, event.clientY);
    }
    displayPerfromance(){
        disp.innerHTML = "fps: "+performance
        +"\nworld seed: "+currentSeed
        +"\ncurrentChunk: "+Math.floor(this.player.x/(64*this.tilemap.tilewidth))+", "+Math.floor(this.player.y/(64*this.tilemap.tilewidth));
    }
}

var game_instance = new Game();