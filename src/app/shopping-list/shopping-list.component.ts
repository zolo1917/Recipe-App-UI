import { ShoppingListService } from './shopping.service';
import { ingredient } from './../shared/ingredient.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  public ingredients : ingredient[] = [];
  private slAddEventSub : Subscription;
  private slRemoveEventSub : Subscription;
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    // subscribing to the added event.
    this.slAddEventSub = this.slService.addEventEmitter.subscribe((item : ingredient)=>{
      this.ingredients.push(item);
    });
    //subscriber to remove item from list
    this.slRemoveEventSub = this.slService.removeEventEmitter.subscribe((item : ingredient)=>{
      this.ingredients.splice(this.ingredients.indexOf(item),1);
    });
  }

  deleteItem(item : ingredient){
    console.log("delete item clicked : " + item.name);
    this.slService.deleteItemFromList(item);
  }

  ngOnDestroy(){
    this.slAddEventSub.unsubscribe();
    this.slRemoveEventSub.unsubscribe();
  }

}
