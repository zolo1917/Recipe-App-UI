import { ingredient } from 'src/app/shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredient implements Action{
    readonly type: string = ADD_INGREDIENT;
    payload: ingredient;
}