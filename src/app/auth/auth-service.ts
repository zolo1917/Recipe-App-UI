import { environment } from './../../environments/environment';
import { UserModel } from './user.model';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class authService {
    user = new BehaviorSubject<UserModel>(null);
    private expirationTimer : any;

    constructor(private http: HttpClient, private router: Router) { }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.HandleError), tap(response => {
            this.HandleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.HandleError), tap(response => {
            this.HandleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationTimer){
            clearTimeout(this.expirationTimer);
        }
        this.expirationTimer = null;
    }

    autoLogout(expirationDuration : number){
        this.expirationTimer = setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }

    private HandleAuthentication(
        email: string,
        localId: string,
        idToken: string,
        expiresIn: number
    ) {
        let expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new UserModel(email, localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
        console.log("storage item : " + localStorage.getItem('userData'));
    }

    autoLogin() {
        let userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        let loadedUser = new UserModel(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData.tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData.tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration * 1000);
        }
    }

    private HandleError(errorRes: HttpErrorResponse) {
        let errorMessage = "An unknown error has occured";
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
                errorMessage = "This email already exists";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "This email doesn't exist.";
                break;
            case "INVALID_PASSWORD":
                errorMessage = "Incorrect Password.";
                break;
        }
        return throwError(errorMessage);
    }
}