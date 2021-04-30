class Item{
    constructor(){
        this.position = new Vector();
        this.asset = new Image();
        this.size = new Vector(25, 25);
    }
    draw(){
        drawImage(this.asset, this.position, this.size);
    }
}

class ball extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/ball.png";
    }
    use(){
        
    }
}

class rock extends Item{
    constructor(){
        super();
        this.asset.src = "./assets/items/rock.png";
    }
}


export {ball, rock};