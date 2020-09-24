import { ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('addIngredient', {static:false}) slform: NgForm;
  name: string = '';
  amount: number = 0;
  subs : Subscription;
  editMode : boolean = false;
  editedItemIndex : number;
  editedItem : ingredient;
  ingredient: ingredient;
  @Output() addEvent = new EventEmitter<ingredient>()
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
      this.subs = this.shoppingListService.startedEditing.subscribe((index:number)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.shoppingListService.getIngredientByIndex(index);
        this.slform.setValue({
          name : this.editedItem.name,
          amount : this.editedItem.amount
        });
      });
  }

  ngOnDestroy() : void{
    this.subs.unsubscribe();
  }
  
  addIngredients(addIngredient : NgForm){
    if(this.slform.valid){
      // this.ingredient = 
      if(this.editMode){
        this.editedItem.name = this.slform.value.name;
        this.editedItem.amount = this.slform.value.amount;
        this.shoppingListService.UpdateIngredient(this.editedItemIndex, this.editedItem);
      }else{
        this.shoppingListService.addItemToList(new ingredient(this.slform.value.name, this.slform.value.amount));
      }
      this.editMode = false;
      this.editedItem = null;
      this.slform.reset();
      // this.shoppingListService.addEventEmitter.emit(new ingredient(addIngredient.value.name, addIngredient.value.amount));
      // addIngredient.reset();
    }
  }
  
  clearForm(){
    this.editMode=false;
    this.editedItem = null;
    this.slform.reset();
  }
}
