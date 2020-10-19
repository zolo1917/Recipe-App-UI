import { Router } from '@angular/router';
import { authService, AuthResponseData } from './auth-service';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  isLoginMode: boolean = false;
  isLoading: boolean = false;
  error: string = null;
  constructor(private as: authService, private router: Router) { }

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
      this.isLoading = false;
    });
    authForm.reset();
    console.log(authForm);
  }

}
