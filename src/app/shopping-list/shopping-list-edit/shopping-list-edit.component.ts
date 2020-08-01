import { ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../shopping.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  
  name: string = '';
  amount: number = 0;
  ingredient: ingredient;
  @Output() addEvent = new EventEmitter<ingredient>()
  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
  }
  
  addIngredients(addIngredient : NgForm){
    if(addIngredient.valid){
      // this.ingredient = 
      this.shoppingListService.addItemToList(new ingredient(addIngredient.value.name, addIngredient.value.amount));
      // this.shoppingListService.addEventEmitter.emit(new ingredient(addIngredient.value.name, addIngredient.value.amount));
      // addIngredient.reset();
    }
  }
  clearForm(addIngredient : NgForm){
    addIngredient.reset();
  }
}
