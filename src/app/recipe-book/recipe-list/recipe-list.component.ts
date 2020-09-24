import { RecipeService } from './../recipe.service';
import { recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() selectedRecipe = new EventEmitter<recipe>()
  recipes : recipe[];
  sub : Subscription;

  constructor(private recipeServ : RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeServ.getRecipes();
    this.sub = this.recipeServ.recipesChanged.subscribe((data : recipe[])=>{
      this.recipes = data;
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
   onNewRecipe(): void{
      this.router.navigate(['new'], {relativeTo : this.activeRoute});
   }

}
