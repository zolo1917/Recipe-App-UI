
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService{
    addEventEmitter = new Subject<ingredient>();
    removeEventEmitter = new Subject<ingredient>();
    updateEventEmitter = new Subject<any>();
    startedEditing = new Subject<number>();
    private ingredients: ingredient[] = [
        new ingredient("Apples",5),
        new ingredient("Tomatos", 4)
      ];
    constructor(){}
    
    getIngredients(){
        return this.ingredients.slice();
    }

    private printIngredientList(){
        this.ingredients.forEach((item)=>{
            console.log("Selected Element : " + item.name +" amount : "+ item.amount);
        });
    }

    addItemToList(item : ingredient){
        // console.log("Adding item to list SLService.addItemToList()");
        if(this.ingredients.some(e => e.name === item.name)){
            // call update item count
            console.log("items exists in list");
            this.updateElementAmount(item);
            
        } else {
            this.ingredients.push(new ingredient(item.name, item.amount));
            this.addEventEmitter.next(new ingredient(item.name, item.amount));
        }
        
    }

    updateElementAmount(item :ingredient ){
        console.log(" In update element count");
        this.ingredients.filter(e=>e.name === item.name)[0].amount += item.amount;
        console.log(item.amount);
        // console.log ("changed Amount : " );
    }

    deleteItemFromList(item : ingredient){
        console.log("Deleting item from shoppingList");
        if(this.ingredients.some(e => e.name === item.name)){
            console.log("item INcluded")
            this.ingredients.splice(this.ingredients.indexOf(item),1);
            // this.printIngredientList();
            this.removeEventEmitter.next(item);
        }
    }

    addAlltoList(items : ingredient[]){
        items.forEach((content)=>{
            this.addItemToList(content);
        });
    }

    getIngredientByIndex(index : number) : ingredient{
        if(index < this.ingredients.length){
            return this.ingredients[index];
        }else {
            return null;
        }
    }
    UpdateIngredient(index : number , newIngredient : ingredient) {
        console.log("index : " +index + " item : " + newIngredient.name + " amount : " + newIngredient.amount);
        this.ingredients[index] = newIngredient;
        this.updateEventEmitter.next();
    }
}