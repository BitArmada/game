var ctx = canv.getContext('2d');
var tilemap = null;
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
    mult(num){
      return new Vector(this.x*num, this.y*num)
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