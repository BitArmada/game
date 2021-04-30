import {ball, rock, stick} from "./items.js";

class Inventory{
    constructor(){
        this.items = [];
        this.itemElements = [];
        this.selectedItem = 0;
        this.hotBarSize = 9; //size of hot bar
        this.inventorySize = 5; //size of inventory
        this.hotbarElement = document.getElementById('hotbar');
        this.inventoryElement = document.getElementById('inventory');
        this.create();

        //select defualt item
        this.select(this.itemElements[this.selectedItem]);

        // add event listeners
        document.addEventListener("wheel", this.onScroll.bind(this));

        this.add(new ball());
        this.add(new rock());
        this.add(new stick());
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
        return item;
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