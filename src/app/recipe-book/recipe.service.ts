import { Injectable, EventEmitter } from '@angular/core';
import { recipe } from './recipe.model';
import { ingredient } from '../shared/ingredient.model';


@Injectable()
export class RecipeService {

    recipeSelected = new EventEmitter<recipe>();

    private recipes : recipe[] = [
        new recipe("Test Recipe 1",
                    "This is a simple description","https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
                    [new ingredient("Pork",2),new ingredient("Cherry tomatos", 5),new ingredient("Parsley",5)]),
        new recipe("Test Recipe 2",
                    "This is a second simple description",
                    "https://images.101cookbooks.com/DIP-PEACE-LOVE-h.jpg?w=680&auto=format",
                    [new ingredient("Chikpeas", 2),new ingredient("tomatos", 3),new ingredient("Parsley", 5)])
      ];

    getRecipes(){
        return this.recipes.slice();
    }
} 