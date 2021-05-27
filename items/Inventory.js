import {ball, rock, stick, Pistol} from "./items.js";

class Inventory{
    constructor(){
        this.items = [];
        this.itemElements = [];
        this.selectedItem = 0;
        this.hotBarSize = 9; //size of hot bar
        this.inventorySize = 5; //size of inventory
        this.hotbarElement = document.getElementById('hotbar');
        this.inventoryElement = document.getElementById('inventory');
        this.descriptionElement = document.getElementById("description");
        this.itemNameElement = document.getElementById('item-name');
        this.itemSummaryElement = document.getElementById('item-summary');
        this.create();

        //select defualt item
        this.select(this.itemElements[this.selectedItem]);

        // add event listeners
        document.addEventListener("wheel", this.onScroll.bind(this));

        this.add(new ball());
        this.add(new rock());
        this.add(new stick());
        this.add(new Pistol());
    }
    add(item){
        var newItemIndex = this.items.length;
        if(newItemIndex >= this.hotBarSize){
            return;
        }
        this.itemElements[newItemIndex].style.backgroundImage = 'url(' + item.asset.src +')';
        this.items.push(item);
    }
    useSelectedItem(event){
        var item = this.getSelectedItem();
        if(item&&typeof item.use == 'function'){
            item.use(event);
        }
    }
    create(){
        this.hotbarElement.style.gridTemplateColumns = 'repeat('+this.hotBarSize+', auto)';
        for(var i = 0; i < this.hotBarSize; i++){
            var item = this.createItemElement();
            this.hotbarElement.appendChild(item);
            this.itemElements.push(item);
        }
    }
    createItemElement(){
        var item = document.createElement("DIV");
        item.classList.add("item");
        item.addEventListener("click", this.itemClick.bind(this));
        item.addEventListener("mousemove", this.mousemove.bind(this));
        item.addEventListener("mouseleave", this.mouseleave.bind(this));
        return item;
    }
    mouseleave(){
        this.descriptionElement.classList.remove("description--active");
    }
    mousemove(event){
        var elem = event.path[0];
        var item = this.items[this.itemElements.indexOf(elem)];
        if(!item){return}
        this.descriptionElement.classList.add("description--active");
        this.descriptionElement.style.top = event.clientY + "px";
        this.descriptionElement.style.left = event.clientX + "px";

        if(item.description && item.name){
            this.itemNameElement.innerHTML = item.name;
            this.itemSummaryElement.innerHTML = item.description;
        }
    }
    itemClick(event){
        var elem = event.path[0];
        this.deSelect(this.itemElements[this.selectedItem]);
        this.selectedItem = this.itemElements.indexOf(elem);
        this.select(this.itemElements[this.selectedItem]);
    }
    getSelectedItem(){
        return this.items[this.selectedItem];
    }
    onScroll(event){
        this.deSelect(this.itemElements[this.selectedItem]);
        this.selectedItem += (event.deltaY/100);
        this.selectedItem = mod(this.selectedItem,this.hotBarSize);
        this.select(this.itemElements[this.selectedItem]);
    }
    select(element){
        element.classList.add("item-selected");
    }
    deSelect(element){
        element.classList.remove("item-selected");
    }
}

export {Inventory};