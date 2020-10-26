import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    declarations : [
        RecipeBookComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailsComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipeBookModule {}