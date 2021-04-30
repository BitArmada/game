var ctx = canv.getContext('2d');
var tilemap = null;
var deltaTime = 0;
class Vector {
    constructor(x, y) {
      if (x) {
        this.x = x;
      } else {
        this.x = 0;
      }
      if (y) {
        this.y = y;
      } else {
        this.y = 0;
      }
    }
    magnitude() {
      return Math.sqrt((this.x * this.x + this.y * this.y) / 10);
    }
    normalize() {
      return this.divide(this.magnitude());
    }
    divide(scalar) {
      return new Vector(this.x / scalar, this.y / scalar);
    }
    multiply(num){
      return new Vector(this.x*num, this.y*num)
    }
    subtract(vec){
      return new Vector(this.x-vec.x, this.y-vec.y);
    }
    subtractUnit(num){
      this.x-=num;
      this.y-=num;
    }
    add(vec){
      this.x+=vec.x;
      this.y+=vec.y;
    }
}
function setPixeleated(){
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
}
function getDist(x1,y1,x2,y2){
  return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}
function fract (val){
  return val- Math.floor(val);
}
function dotProduct(v1, v2)
{
  return v1.x * v2.x + v1.y * v2.y;
}
function random(range){
  return (Math.random()*range*2)-range;
}
function randomVector(r){
  if(r){
    return new Vector(random(r), random(r));
  }
  return new Vector(random(1), random(1));
}
function generateRandomHexCode(){
  const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

  let hexCode = "#" 

  while( hexCode.length < 7 ){
    hexCode += digits[ Math.round( Math.random() * digits.length ) ]
  }

  return hexCode 
}
function randomHex(){
  const digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f']

  let hexCode = ""

  hexCode+=digits[ Math.round( Math.random() * digits.length ) ];

  return hexCode 
}
function drawImage(asset, position, size, p, s){
  setPixeleated();
  this.screenCords = tilemap.toScreenSpace(position.x, position.y);
  if(s||p){
      ctx.drawImage(asset, p.x, p.y, s.x, s.y, this.screenCords.x-(size.x/2), this.screenCords.y-(size.y/2), size.x, size.y);
  }else{
      ctx.drawImage(asset, this.screenCords.x-(size.x/2), this.screenCords.y-(size.y/2), size.x, size.y);
  }
}
function fillRect(position, size, color){
  this.screenCords = tilemap.toScreenSpace(position.x, position.y);
  ctx.fillStyle = color;
  ctx.fillRect(this.screenCords.x-(size.x/2), this.screenCords.y-(size.y/2), size.x, size.y);
}
function fillRectRotated(position, size, color, rot){
  this.screenCords = tilemap.toScreenSpace(position.x, position.y);
  ctx.fillStyle = color;
  ctx.save();
  ctx.translate(this.screenCords.x, this.screenCords.y);
  ctx.rotate(rot*Math.PI/180);
  ctx.fillRect(-(size.x/2), -(size.y/2), size.x, size.y);
  ctx.restore();
}
function vecToRot(vec){
  return (-Math.atan2(vec.x,vec.y)*180/Math.PI)+180;
}
function mod(num, n) {
  return ((num%n)+n)%n;
};

/**
 *  ctx.save();
  ctx.translate((player.x-(offsetX*tilewidth) ), player.y-(offsetY*tilewidth));
  ctx.rotate(player.rot*Math.PI/180);
  ctx.drawImage(player.asset, -(tilewidth/2),-(tilewidth/2), tilewidth, tilewidth);
  ctx.restore();
  player.rot =  (-Math.atan2(mouse.vec.x, mouse.vec.y)*180/Math.PI)+180;
 */