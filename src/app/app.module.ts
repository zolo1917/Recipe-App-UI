import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
// import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // removing modules from import as they are being lazy loaded.
    // RecipeBookModule,
    // ShoppingListModule,
    HttpClientModule,
    SharedModule,
    StoreModule.forRoot({
      shoppingList: shoppingListReducer
    }),
    // AuthModule,
    CoreModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
