import { AuthInterceptorService } from './auth/auth-interceptor-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from './recipe-book/recipe.service';
import { ShoppingListService } from 'src/app/shopping-list/shopping.service';
import { NgModule } from '@angular/core';

@NgModule({
    providers:[ShoppingListService, RecipeService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }]
})
export class CoreModule{}