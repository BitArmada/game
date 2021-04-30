import {ball, rock} from "./items.js";
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
        this.add(new ball());
        this.add(new rock());
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
        this.items[this.selectedItem].use(event);
    }
    create(){
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
}

export {Inventory};