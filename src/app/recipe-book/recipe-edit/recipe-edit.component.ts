import { ActivatedRoute, Params } from '@angular/router';
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
  routeSub : Subscription;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params : Params) => {
        this.id = params['id'];
        this.editMode = (params['id']!=null);
        console.log(this.editMode);
    });
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

}
