import { ingredient } from './../shared/ingredient.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public ingredients: ingredient[] = [
    new ingredient("Apples",5),
    new ingredient("Tomatos", 4)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  add(event){
    this.ingredients.push(event);
  }

}
