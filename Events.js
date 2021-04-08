var up = false;
var down = false;
var left = false;
var right = false

//KEYS
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37:
      left = true;
      break;
    case 38: 
      up = true;
      break;
    case 39:
      right = true;
      break;
    case 40: 
      down = true;
      break;
    case 32: 
      break;
    case 65: 
      left = true;
      break;
    case 68: 
      right = true;
      break;
    case 87: 
      up = true;
      break;
    case 83: 
      down = true;
      break;
  }
}

function keyUp(/** @type {KeyboardEvent} */ ev) {
  switch (ev.keyCode) {
    case 37: // left arrow (stop rotating left)
      left = false;
      break;
    case 38: // up arrow (stop thrusting)
      up = false;
      break;
    case 39: // right arrow (stop rotating right)
      right = false;
      break;
    case 40: // right arrow (stop rotating right)
      down = false;
      break;
     case 65: // left arrow (rotate ship left)
      left = false;
      break;
    case 68: // left arrow (rotate ship left)
      right = false;
      break;
    case 87: // left arrow (rotate ship left)
      up = false;
      break;
    case 83: // left arrow (rotate ship left)
      down = false;
      break;
  }
}