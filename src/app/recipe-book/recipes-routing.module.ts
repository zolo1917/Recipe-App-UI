import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeBookComponent } from './recipe-book.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { recipesResolver } from './recipes-resolver';

const routes: Routes = [{
    path: '', component: RecipeBookComponent,
    canActivate : [AuthGuard],
    children: [
        { path: '', component: RecipeStartComponent },
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailsComponent, resolve: [recipesResolver] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [recipesResolver] }
    ]
}];

@NgModule({
    imports:[
        RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
})
export class RecipesRoutingModule{}