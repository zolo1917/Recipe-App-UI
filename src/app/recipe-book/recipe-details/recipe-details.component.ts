import { RecipeService } from './../recipe.service';
import { recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() selectedRecipe :recipe;
  constructor(private recipeService : RecipeService, 
              private slService : ShoppingListService) {
   }

  ngOnInit(): void {
    this.recipeService.recipeSelected.subscribe((recipe : recipe) =>{
      console.log("In RS RecipeDetailsComponent");
      this.selectedRecipe = recipe;
    });
  }
  addItemsToSL(item : ingredient) {
    console.log("Adding item to list : " + item.name);
    this.slService.addItemToList(item);
  }
  addAllToSL(items : ingredient[]){
    console.log("Adding multiple items to list")
    this.slService.addAlltoList(items);
  }
  

}
