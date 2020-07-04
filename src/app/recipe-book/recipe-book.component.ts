import { recipe } from './recipe.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  
  displayedRecipe : recipe;
  constructor() { }

  ngOnInit(): void {
  }
  
  showSelectedRecipe(event){
    console.log("recipe - book :" + event);
    this.displayedRecipe = event;
  }
}
