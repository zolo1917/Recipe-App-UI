import { recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedRecipe = new EventEmitter<recipe>()
  recipes : recipe[] = [
    new recipe("Test Recipe 1","This is a simple description","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",["Pork","Cherry tomatos","Parsley"]),
    new recipe("Test Recipe 2","This is a second simple description","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",["Paneer","tomatos","Parsley"])
  ];

  constructor() { }

  ngOnInit(): void {
  }

  OnRecipeSelect(event){
    console.log("recipe - list :" + event);
    this.selectedRecipe.emit(event);
  }

}
