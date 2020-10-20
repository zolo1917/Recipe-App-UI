import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { authService, AuthResponseData } from './auth-service';
import { NgForm } from '@angular/forms';
import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode = false;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, {static : false}) alertHost : PlaceholderDirective;
  private closeSub : Subscription;
  constructor(
      private as: authService, 
      private router: Router,
      private CFResolver : ComponentFactoryResolver
    ) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      console.log("Login error");
      return;
    }
    let email = authForm.value.email;
    let password = authForm.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    if (this.isLoginMode) {
      authObs = this.as.login(email, password)
    } else {
      authObs = this.as.signup(email, password)
    }
    authObs.subscribe(resData => {
      console.log("Response Success");
      this.error = null;
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(["/recipes"]);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.showErrorComponent(errorMessage);
      this.isLoading = false;
    });
    authForm.reset();
    console.log(authForm);
  }

  onCloseError(){
    this.error = null;
  }

  private showErrorComponent(message: string){
    const alertCmpFactory = this.CFResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub= componentRef.instance.closeEmitter.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
