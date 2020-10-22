import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        AuthComponent
    ],
    imports : [
        RouterModule.forChild([
            { path: 'auth', component: AuthComponent }
        ]),
        SharedModule
    ],
    exports: []
})
export class AuthModule{}