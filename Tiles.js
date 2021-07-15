var Tiles = {
    grass:  new Image(),
    cardinalGrass:  new Image(),
    water:  new Image(),
    lava:  new Image(),
    stone:  new Image(),
    sand:  new Image(),
    dirt:  new Image(),
    snow:  new Image(),
    ice: new Image(),
    magma:  new Image(),
    cardinal: new Image(),
    testTile: new Image(),
    stone: new Image(),
    dirt: new Image(),
    temple_sheet: new Image(),
}
//load images d
Tiles.grass.src = "assets/Tiles/grass.png";
Tiles.water.src = "assets/Tiles/Watermine.png";
Tiles.sand.src = "assets/Tiles/Sand.png";
Tiles.magma.src = "assets/Tiles/magmaTile.png";
Tiles.snow.src = "assets/Tiles/snow.png";
Tiles.ice.src = "assets/Tiles/ice.png";
Tiles.lava.src = "assets/Tiles/lava.png";
Tiles.cardinal.src = "assets/Tiles/cardinalstone.png";
Tiles.cardinalGrass.src = "assets/Tiles/cardinal grass.png";
Tiles.testTile.src = "assets/Tiles/cardinal.png";
Tiles.stone.src = "assets/Tiles/stone.png";
Tiles.dirt.src = "assets/Tiles/dirt.png";
Tiles.temple_sheet.src = "assets/Tiles/temple sheet.png";

//var tiles = new Map();

class BasicTile{
    constructor(asset, id){
        this.id = id;
        this.form = new Vector();
        this.asset = asset;
        this.collidable = false;
        this.name = "basic tile";
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, (this.form.x)*16, (this.form.y)*16, 16,16, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
    onCollision(){
    }
}
class Tile{
    constructor(){
        this.id = 1;
        this.asset;
        this.collidable = false;
        this.name = "template tile";
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
    onCollision(){
    }
}

class grass extends Tile{
    constructor(){
        super();
        this.asset = Tiles.grass;
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, 0, 0, 16, 16, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
}
class Lava extends Tile{
    constructor(){
        super();
        this.asset = Tiles.lava;
        this.collidable = true;
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, 0, 0, 16, 16, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
}
class stone extends Tile{
    constructor(){
        super();
        this.asset = Tiles.stone;
        this.collidable = true;
        this.name = "stone";
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, 0, 0, 16, 16, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
}
class temple_floor extends Tile{
    constructor(){
        super();
        this.asset = Tiles.temple_sheet;
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, 16,0,16,16,x, y, width, height);
    }
}
class dirt extends Tile{
    constructor(){
        super();
        this.asset = Tiles.dirt;
    }
    render(x, y, width, height){
        ctx.drawImage(this.asset, x, y, width, height);
    }
    tileUpdate(x, y, tiles){
    }
}