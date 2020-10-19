import { authService } from './../auth/auth-service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSub: Subscription;

  constructor(private dsService: DataStorageService, private authServe: authService) { }

  ngOnInit(): void {
    this.userSub = this.authServe.user.subscribe(user => {
      this.isAuthenticated = !!user;
      console.log(!!user);
    });
  }

  onSaveData() {
    this.dsService.saveRecepies();
  }

  onFetchData() {
    this.dsService.getStoreRecepies().subscribe();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  OnLogout() {
    this.authServe.logout();
  }

}
