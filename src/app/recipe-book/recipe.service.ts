import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { recipe } from './recipe.model';
import { ingredient } from '../shared/ingredient.model';


@Injectable()
export class RecipeService {

    recipeSelected = new Subject<recipe>();
    recipesChanged = new Subject<recipe[]>();

    // private recipes: recipe[] = [
    //     new recipe("Test Recipe 1",
    //         "This is a simple description", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg",
    //         [new ingredient("Pork", 2), new ingredient("Cherry tomatos", 5), new ingredient("Parsley", 5)]),
    //     new recipe("Test Recipe 2",
    //         "This is a second simple description",
    //         "https://images.101cookbooks.com/DIP-PEACE-LOVE-h.jpg?w=680&auto=format",
    //         [new ingredient("Chikpeas", 2), new ingredient("tomatos", 3), new ingredient("Parsley", 5)])
    // ];

    private recipes: recipe[] = [];

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipeById(id: number) {
        if (id < this.recipes.length) {
            return this.recipes[id];
        } else {
            return null;
        }
    }

    addRecipe(recipe: recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
} 