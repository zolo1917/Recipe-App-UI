import { RecipeService } from './../recipe.service';
import { recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping.service';
import { ActivatedRoute, Params, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  selectedRecipe :recipe;
  id : number;
  constructor(private recipeService : RecipeService, 
              private slService : ShoppingListService,
              private activeRoute: ActivatedRoute,
              private router : Router) {
   }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params : Params)=>{
      // id = this.activeRoute.snapshot.params['id'];
      this.id = params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(this.id);
    });
    // console.log(this.activeRoute.snapshot.params['id']);
    // console.log(this.activeRoute.snapshot.params.toString());
    // this.recipeService.recipeSelected.subscribe((recipe : recipe) =>{
    //   console.log("In RS RecipeDetailsComponent");
    //   this.selectedRecipe = recipe;
    // });
    
  }

  onEdit(){
    this.router.navigate(['edit'], {relativeTo : this.activeRoute});
    // alternate method
    // this.router.navigate(['../',this.id, 'edit'], {relativeTo: this.activeRoute})
  }

  addItemsToSL(item : ingredient) {
    console.log("Adding item to list : " + item.name);
    this.slService.addItemToList(item);
  }
  addAllToSL(items : ingredient[]){
    console.log("Adding multiple items to list")
    this.slService.addAlltoList(items);
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

}
