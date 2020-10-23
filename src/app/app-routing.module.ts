import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NgModule } from '@angular/core';
import { RecipeBookModule } from './recipe-book/recipe-book.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { AuthModule } from './auth/auth.module';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    // { path: 'recipes', loadChildren : './recipe-book/recipe-book.module#RecipeBookModule' }
    // Alternate representation
    { path : 'recipes', loadChildren : () => import('./recipe-book/recipe-book.module').then(m => RecipeBookModule)},
    { path : 'shopping-list', loadChildren : () => import ('./shopping-list/shopping-list.module').then(m => ShoppingListModule)},
    { path : 'auth', loadChildren : () => import('./auth/auth.module').then(m => AuthModule)}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy : PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}