import { authService } from './auth/auth-service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'recipe-app';
  // switchSection: boolean  = true;
  // currnetDisplay : string = 'recipes';

  // headerSelector(event){
  //   this.currnetDisplay = event;
  //   this.switchSection = !this.switchSection;
  // }
  constructor(private authServe: authService) { }
  ngOnInit() {
    this.authServe.autoLogin();
  }
}
