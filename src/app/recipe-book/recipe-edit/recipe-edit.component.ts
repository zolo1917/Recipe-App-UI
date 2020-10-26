import { recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode : boolean = false;
  recipeForm : FormGroup;
  routeSub : Subscription;
  constructor(private activatedRoute : ActivatedRoute, private rs : RecipeService, private router : Router) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params : Params) => {
        this.id = params['id'];
        this.editMode = (params['id']!=null);
        console.log(this.editMode);
        this.initForm();
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  private initForm(){
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([]);
    if(this.editMode){
      const recipe = this.rs.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }  
      }
    }
    this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath' : new FormControl(recipeImagePath, Validators.required),
        'description' : new FormControl(recipeDescription, Validators.required),
        'ingredients' : recipeIngredients
    });
  }

  addIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount' : new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }
  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  // corrusponding Html code : 
  // *ngFor="let ingredientCtrl of controls; let i = index"

  OnSubmit(){
    // console.log(this.recipeForm.value);
    // submit the form here
    // let newRecipe = new recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if(this.editMode){
      this.rs.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.rs.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  /**
   * can be used to remove all the elements of the array.
   * (<FormArray>this.recipeForm.get('ingredients')).clear();
   * @param index 
   */
  removeIngredient(index : number ){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel(){
    this.router.navigate(['../'], {relativeTo : this.activatedRoute});
  }

}
