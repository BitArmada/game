import {ball, rock, stick, Pistol, Stone, Stone_Axe, Block} from "../items/items.js";
var ctx = canv.getContext('2d');
var biomerarity = 1.95;
// width of world you wil reach ocean if you get to the end
var chunkwidth = 64;
var worldWidth = 1000;
var worldHeight = 1000;
var oceanwidth = 10;

class Tilemap{
    constructor(player){
        this.width = worldWidth;
        this.height = worldHeight;
        this.chunks = []//Array.from(Array(this.width), () => new Array(this.height));
        this.loadedChunks = [];
        this.chunkpos = new Vector(-100,-100);
        this.tilewidth = 32;
        this.tileoffx = 0;
        this.tileoffy = 0;
        this.offsetX = 0;
        this.offsetY = 0;
        this.visibletilesY = 0;
        this.visibletilesX = 0;
        this.camera = player;
        noise.seed(Math.random());
        //this.loadMap();
    }
    draw(){
        //finding visible tiles
        this.visibletilesY = canv.height/this.tilewidth;
        this.visibletilesX = canv.width/this.tilewidth;
        
        //finding visible tiles and offset
        this.offsetX = (this.camera.position.x) - (Math.floor(this.visibletilesX) / 2);
        this.offsetY = (this.camera.position.y) - (Math.floor(this.visibletilesY) / 2);
        
        //handle camera off screen
        if(this.offsetX < -this.width*chunkwidth ){this.offsetX = -this.width*chunkwidth ;}
        if(this.offsetY < -this.height*chunkwidth){this.offsetY = -this.height*chunkwidth;}
        if(this.offsetX > this.width*chunkwidth - this.visibletilesX){ this.offsetX = this.width*chunkwidth - this.visibletilesX};
        if(this.offsetY > this.height*chunkwidth - this.visibletilesY){ this.offsetY = this.height*chunkwidth - this.visibletilesY};
        
        this.tileoffx = (this.offsetX - Math.floor(this.offsetX))*this.tilewidth;
        this.tileoffy = (this.offsetY - Math.floor(this.offsetY))*this.tilewidth;

        this.calculateChunkPos();
        //console.time("render");
        for(var x = 0; x < this.visibletilesX+1; x++){
            for(var y = 0; y < this.visibletilesY+1; y++){ 
                //loop through chunks
                var tile = {id: -1};
                for(var i = 0; i < this.loadedChunks.length; i++){
                    tile = this.loadedChunks[i].gettile(x, y, this.offsetX, this.offsetY);
                    if(tile.id != -1){break;}
                }
                if(tile.id != -1){
                    //ctx.drawImage(tile.asset, (x*this.tilewidth)-this.tileoffx, (y*this.tilewidth)-this.tileoffy, this.tilewidth, this.tilewidth);
                    tile.render(Math.round((x*this.tilewidth)-this.tileoffx), Math.round((y*this.tilewidth)-this.tileoffy), this.tilewidth, this.tilewidth);
                }
            }
        }
        //console.timeLog("render");
        //console.timeEnd("render");
        
        for(var i = 0; i < this.loadedChunks.length; i++){
            this.loadedChunks[i].update();
        }

    }
    calculateChunkPos(){
        var nx = Math.floor(this.offsetX/chunkwidth);
        var ny = Math.floor(this.offsetY/chunkwidth);
        if(this.chunkpos.x !==  nx || this.chunkpos.y !== ny){
            //we are in a new chunk
            this.loadedChunks = [];
            this.loadChunk(nx, ny);
            this.loadChunk(nx+1, ny);
            this.loadChunk(nx, ny+1);
            this.loadChunk(nx+1, ny+1);
        }
        this.chunkpos.x = nx;
        this.chunkpos.y = ny;
    }
    loadChunk(x, y){
        var chunk = this.getChunk(x*chunkwidth, y*chunkwidth);
        //if this chunk has not been loaded then generate a new one;
        if(chunk == false){
            this.chunks.push(new Chunk(x, y));
            this.loadedChunks.push(this.chunks[this.chunks.length-1]);
        }else{
            this.loadedChunks.push(chunk);
        }
    }
    getChunk(x, y) {
        for(var i = 0; i < this.chunks.length; i++) {
            if(this.chunks[i].offset.x == x&&this.chunks[i].offset.y == y){
                return this.chunks[i];
            }
        }
        return false;
    }
    toScreenSpace(x, y){
        return {x: ((x*this.tilewidth)-(this.offsetX*this.tilewidth)), y: ((y*this.tilewidth)-(this.offsetY*this.tilewidth))};
    }
    pixelsToScreenSpace(x, y){
        return {x: (x-(this.offsetX*this.tilewidth)), y: (y-(this.offsetY*this.tilewidth))};
    }
    toWorldSpace(x, y){
        return {x: ((x/this.tilewidth)+this.offsetX), y: ((y/this.tilewidth)+this.offsetY)};
    }
    getTile(x, y) //returns tile from loaded chunks
    {
        for(var i = 0; i < this.loadedChunks.length; i++){
            var tile = this.loadedChunks[i].getTileWorld(x, y);
            if(tile){
                return tile;
            }
        }
        return false;
    }
    setTile(x, y, tile){
        var chunk = this.getChunk(Math.floor(x/chunkwidth)*chunkwidth, Math.floor(y/chunkwidth)*chunkwidth);
        chunk.setTile(x-chunk.offset.x, y-chunk.offset.y, tile);
    }
    destroy(x, y){
        // destroys a tile
        var tile = this.getTile(x, y);
        this.setTile(x, y, new dirt());
        
        var item = new Block(tile);
        item.position = new Vector(x, y);
        game_instance.add(item);
    }
}
class Chunk {
    constructor(offx, offy){
        this.width = chunkwidth;
        this.height = chunkwidth;
        this.offset = new Vector(offx*chunkwidth, offy*chunkwidth);
        this.map = [];
        this.loadMap();
    }
    onLoad(){}
    update(){
        /*ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.strokeRect((this.offset.x*10)+canv.width/2,(this.offset.y*10)+canv.width/2,10*this.width,10*this.height);*/
    }
    loadMap(){
        for(var y = 0; y < this.height; y++){
            this.map.push([]);
            for(var x = 0; x < this.width; x++){
                var height = heightGen(this.offset.x+x, this.offset.y+y);
                var biome = biomeGen(this.offset.x+x, this.offset.y+y);
                if(oceanGen(this.offset.x+x, this.offset.y+y,(worldWidth*chunkwidth), (worldHeight*chunkwidth))){
                    this.map[y].push(new Tile(Tiles.water, 2));
                }else{
                    var tile = ToTile(height, biome);
                    //send block update to tile above this tile if this tile is water
                    this.map[y].push(tile);
                    if(tile.id == 2&&y>0){
                        this.map[y-1][x].tileUpdate(x, y-1, this.map);
                    }
                }
            }
        }
    }
    //in screen space
    gettile(x, y, offX, offY){
        var offsetX = (Math.floor(offX)-this.offset.x);
        var offsetY = (Math.floor(offY)-this.offset.y);

        if(y + Math.floor(offsetY)<this.height&&x + Math.floor(offsetX)<this.width){
            return this.map[y + Math.floor(offsetY)][x + Math.floor(offsetX)];
        }else{
            return {id: -1};
        }
    }
    //world space
    getTile(x, y){
        if(x<0||x>this.width-1){return false;}
        if(y<0||y>this.height-1){return false;}
        return this.map[y][x];
    }
    //world space for world space positions as well
    getTileWorld(xp, yp){
        var x = xp-this.offset.x; 
        var y = yp-this.offset.y;
        if(x<0||x>this.width-1){return false;}
        if(y<0||y>this.height-1){return false;}
        return this.map[y][x];
    }
    setTile(x, y, tile){
        this.map[y][x] = tile;
    }
}
function ToTile(height, biome){
    if(biome>1.5&&biome<biomerarity){
        if(height>1.5){
            return new BasicTile(Tiles.cardinal,1);
        }else if(height>0.8){
            return new BasicTile(Tiles.testTile,1);
        }else{
            return new Lava();
        }
    }else if(biome>biomerarity){
        if(height>0.8){
            return new BasicTile(Tiles.snow,1);
        }else{
            return new BasicTile(Tiles.ice,1);
        }
    }else{
        if(height>0.8){
            return new grass();
        }else{
            return new BasicTile(Tiles.water,2);
        }
    }
}
function biomeGen(x, y){
    var scale = 50;
    return (noise.voronoi((x / scale)+noise.perlin2(x/scale, y/scale)/2, (y / scale)+noise.simplex2(x/scale, y/scale)/2))+1;
}
function generateTemple(){
    tilemap.setTile(1,100,Tiles.stone);
}
function oceanGen(sx, sy, depthx, depthy){
    var scale = 5;
    var x = sx+noise.perlin2(sx/scale, sy/scale)*5;
    var y = sy+noise.perlin2(sx/scale, sy/scale)*5;
    if(x<-depthx+oceanwidth){return true}
    if(x>depthx-oceanwidth){return true}
    if(y<-depthy+oceanwidth){return true}
    if(y>depthy-oceanwidth){return true}
    return false;
}
function heightGen(x, y){
    return (noise.perlin2(x / 20,y / 20))+1;
}
function round(val){
    if(val < 0){
        return Math.ceil(val);
    }else{
        return Math.floor(val);
    }
}
export {Tilemap};