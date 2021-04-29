var menuDiv = document.getElementById("description");
var active = "description--active";

function description(event){
    var current = event.srcElement;
    menuDiv.classList.add(active);
    menuDiv.style.top = event.clientY + "px";
    menuDiv.style.left = event.clientX + "px";
}

function closemenu(event){
    menuDiv.classList.remove(active);
}