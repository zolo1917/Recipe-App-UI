import { RecipeService } from './../recipe.service';
import { recipe } from './../recipe.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  // @Output() selectedRecipe = new EventEmitter<recipe>()
  recipes : recipe[];

  constructor(private recipeServ : RecipeService, private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeServ.getRecipes();
  }

   onNewRecipe(): void{
      this.router.navigate(['new'], {relativeTo : this.activeRoute});
   }

}
