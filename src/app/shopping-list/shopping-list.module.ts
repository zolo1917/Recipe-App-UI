import { SharedModule } from './../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports:[
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent }
        ]),
        SharedModule
    ],
    exports:[]
})
export class ShoppingListModule {}