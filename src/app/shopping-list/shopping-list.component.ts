import { ShoppingListService } from './shopping.service';
import { ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {

  public ingredients : ingredient[] = [];

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    // subscribing to the added event.
    this.slService.addEventEmitter.subscribe((item : ingredient)=>{
      this.ingredients.push(item);
    });
    //subscriber to remove item from list
    this.slService.removeEventEmitter.subscribe((item : ingredient)=>{
      this.ingredients.splice(this.ingredients.indexOf(item),1);
    });
  }

  deleteItem(item : ingredient){
    console.log("delete item clicked : " + item.name);
    this.slService.deleteItemFromList(item);
  }

}
