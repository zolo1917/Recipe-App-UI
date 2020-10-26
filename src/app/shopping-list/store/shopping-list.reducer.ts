import * as  slActions from './shopping-list.actions';
// import { Action } from '@ngrx/store';
import { ingredient } from 'src/app/shared/ingredient.model';
const initialState = {
    ingredients: [
        new ingredient("Apples",5),
        new ingredient("Tomatos", 4)
      ]
};

export function shoppingListReducer(state = initialState, action : slActions.AddIngredient){
    switch(action.type){
        case slActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
    }

}