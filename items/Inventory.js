import {ball, rock, stick, Pistol, Stone, Stone_Axe, Block} from "./items.js";

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

        this.add(new Stone());
        for(var i = 0; i < 100; i++){this.add(new Block(new temple_floor()));}
        this.add(new Stone_Axe());

        // add event listeners
        document.addEventListener("wheel", this.onScroll.bind(this));
    }
    add(item){
        if(this.stack(item)){
            return;
        }
        var newItemIndex = this.items.length;
        if(newItemIndex >= this.hotBarSize){
            return;
        }
        this.itemElements[newItemIndex].style.backgroundImage = 'url(' + item.asset.src +')';
        this.items.push(item);
        this.updateQuantity(newItemIndex);
    }
    remove(index){
        this.itemElements[index].style.backgroundImage = "none";
        this.items.splice(this.selectedItem, 1);
        this.itemElements[index].firstChild.innerHTML = "";
    }
    useSelectedItem(event){
        var item = this.getSelectedItem();
        if(item&&typeof item.use == 'function'){
            item.use(event);
            if(!item.reusable){
                if(item.quantity <= 1){
                    this.remove(this.selectedItem);
                }else{
                    item.quantity--;
                    this.updateQuantity(this.selectedItem);
                }
            }
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

        //create quantity div
        var quantity = document.createElement("DIV");
        quantity.classList.add("quantity");
        item.appendChild(quantity);
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
    updateQuantity(index) {
        if(this.items[index].quantity !== 1){
            this.itemElements[index].firstChild.innerHTML = this.items[index].quantity;
        }else{
            this.itemElements[index].firstChild.innerHTML = "";
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
    stack(item){
        for(var i = 0; i < this.items.length; i++){
            if(this.items[i].constructor == item.constructor){
                this.items[i].quantity++;
                this.updateQuantity(i);
                return true;
            }
        }
        return false;
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