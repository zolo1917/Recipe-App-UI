import { authService } from './../auth/auth-service';
import { ingredient } from './ingredient.model';
import { RecipeService } from './../recipe-book/recipe.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { recipe } from '../recipe-book/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private httpService: HttpClient, private rs: RecipeService, private authServe: authService) {
    }

    getStoreRecepies() {
        return this.httpService.get('https://ng-courseproject-2f908.firebaseio.com/recipes.json').pipe(
            map((recipesData: recipe[]) => {
                return recipesData.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                });
            }),
            tap((data: recipe[]) => {
                console.log(data);
                this.rs.setRecipes(data);
            })
        );
    }

    saveRecepies() {
        const recepies = this.rs.getRecipes();
        this.httpService.put('https://ng-courseproject-2f908.firebaseio.com/recipes.json', recepies).subscribe((data) => {
            console.log(data);
        });
    }
}