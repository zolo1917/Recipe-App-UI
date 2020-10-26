import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinner } from './Loading Spinner/loading-Spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations:[
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        LoadingSpinner
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports:[
        AlertComponent,
        PlaceholderDirective,
        DropdownDirective,
        LoadingSpinner,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class SharedModule {}