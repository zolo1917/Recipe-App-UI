import { RecipeService } from './recipe.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage-service';
import { recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })

export class recipesResolver implements Resolve<recipe[]> {
    constructor(private dsService: DataStorageService, private recipeServ: RecipeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeServ.getRecipes();
        if (recipes.length === 0) {
            return this.dsService.getStoreRecepies();
        } else {
            return recipes;
        }
    }

} 