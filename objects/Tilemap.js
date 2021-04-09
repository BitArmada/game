var ctx = canv.getContext('2d');
var biomerarity = 1.95;
var chunkwidth = 64;

class Tilemap{
    constructor(player){
        this.width = 100;
        this.height = 100;
        this.chunks = []//Array.from(Array(this.width), () => new Array(this.height));
        this.loadedChunks = [];
        this.chunkpos = new Vector(-100,-100);
        this.tilewidth = 50;
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
    /*loadMap(){
        noise.seed(Math.random());
        for(var y = 0; y < this.height; y++){
            this.map.push([]);
            for(var x = 0; x < this.width; x++){
                var height = heightGen(x, y);
                var biome = biomeGen(x, y);
                this.map[y].push(ToTile(height, biome));
            }
        }
    }*/
    draw(){
        //finding visible tiles
        this.visibletilesY = canv.height/this.tilewidth;
        this.visibletilesX = canv.width/this.tilewidth;
        
        //finding visible tiles and offset
        this.offsetX = (this.camera.x/this.tilewidth) - (Math.floor(this.visibletilesX) / 2);
        this.offsetY = (this.camera.y/this.tilewidth) - (Math.floor(this.visibletilesY) / 2);
        
        //handle camera off screen
        if(this.offsetX < -this.width ){this.offsetX = -this.width ;}
        if(this.offsetY < -this.height){this.offsetY = -this.height;}
        if(this.offsetX > this.width - this.visibletilesX){ this.offsetX = this.width - this.visibletilesX};
        if(this.offsetY > this.height - this.visibletilesY){ this.offsetY = this.height - this.visibletilesY};
        
        this.tileoffx = (this.offsetX - Math.floor(this.offsetX))*this.tilewidth;
        this.tileoffy = (this.offsetY - Math.floor(this.offsetY))*this.tilewidth;

        this.calculateChunkPos();
        for(var x = 0; x < this.visibletilesX+1; x++){
            for(var y = 0; y < this.visibletilesY+1; y++){
                //loop through chunks
                var tile = {id: -1};
                for(var i = 0; i < this.loadedChunks.length; i++){
                    tile = this.loadedChunks[i].gettile(x, y, this.offsetX, this.offsetY);
                    if(tile.id != -1){break;}
                }
                if(tile.id != -1){
                    ctx.drawImage(tile.asset, (x*this.tilewidth)-this.tileoffx, (y*this.tilewidth)-this.tileoffy, this.tilewidth, this.tilewidth);
                }
            }
        }
        
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
                this.map[y].push(ToTile(height, biome));
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
        if(x<0||x>this.width-1){return '.';}
        if(y<0||y>this.height-1){return '.';}
        return this.map[y][x];
    }
}
function ToTile(height, biome){
    if(biome>1.5&&biome<biomerarity){
        if(height>1.5){
            return new Tile(Tiles.cardinal);
        }else if(height>0.8){
            return new Tile(Tiles.cardinalGrass);
        }else{
            return new Tile(Tiles.lava);
        }
    }else if(biome>biomerarity){
        if(height>0.8){
            return new Tile(Tiles.snow);
        }else{
            return new Tile(Tiles.ice);
        }
    }else{
        if(height>0.8){
            return new Tile(Tiles.grass);
        }else{
            return new Tile(Tiles.water);
        }
    }
}
function biomeGen(x, y){
    var scale = 50;
    return (noise.voronoi((x / scale)+noise.perlin2(x/scale, y/scale)/2, (y / scale)+noise.simplex2(x/scale, y/scale)/2))+1;
}
function heightGen(x, y){
    return (noise.perlin2(x / 10,y / 10))+1;
}
class Tile{
    constructor(asset,){
        this.id = 1;
        this.asset = asset;
    }
    render(){
    }
}
function round(val){
    if(val < 0){
        return Math.ceil(val);
    }else{
        return Math.floor(val);
    }
}
export {Tilemap, Tile};