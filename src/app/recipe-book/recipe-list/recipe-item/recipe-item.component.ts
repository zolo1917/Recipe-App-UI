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
  @Input() index:number;
  // @Output() selectedRecipeEmement = new EventEmitter<recipe>();
  constructor(private recipeServ : RecipeService) { 
  }

  ngOnInit(): void {
  }
  /** 
   * Removing this snippet of code as it is being handled by the angular routing
   * 
   * */ 
  // EmitSelectedRecipe(){
  //   // this.selectedRecipeEmement.emit(this.recipeElement);
  //   // this.recipeServ.recipeSelected.emit(this.recipeElement);
  // }

}
