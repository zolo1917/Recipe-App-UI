import { RecipeService } from './../../recipe.service';
import { recipe } from './../../recipe.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeElement : recipe ; 
  // @Output() selectedRecipeEmement = new EventEmitter<recipe>();
  constructor(private recipeServ : RecipeService) { 
  }

  ngOnInit(): void {
  }

  EmitSelectedRecipe(){
    // this.selectedRecipeEmement.emit(this.recipeElement);
    this.recipeServ.recipeSelected.emit(this.recipeElement);
  }

}
