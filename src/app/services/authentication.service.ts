import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { RouterModule, Routes, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface UserDetails {
  id: string;
  email: string;
  username: string;
  exp: number;
  isAdmin: boolean;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  username?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private AuthenticationURL:string
  env = environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private router: Router) {
    this.AuthenticationURL = `${this.env.backendUri}`;
   }
  
   private saveToken(token: string): void {
    localStorage.removeItem('mean-token');
    localStorage.setItem('mean-token', token);
  }

  public getToken(): string {
    return localStorage.getItem('mean-token');
  }

  public logout(): void {
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/landing');
  }
  
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
     payload = token.split('.')[1];
     payload = window.atob(payload);
     return JSON.parse(payload);
    }
    else {
     return null;
    }
  }
  
  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } 
    else {
      return false;
    }
  }

  public isAdmin():boolean {
    const user = this.getUserDetails();
    if (user && this.isLoggedIn()) {
      return user.isAdmin
    } 
    else {
      return false;
    }
  }
  
  public register(user: TokenPayload): Observable<any> {
    return this.http.post(this.AuthenticationURL+'/register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    let base = this.http.post(this.AuthenticationURL+'/authenticate', user);
    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
        })
      );    
      return request;
  }

  public resetPassword(email:string): Observable<any> {
    return this.http.get(this.AuthenticationURL+'/reset_password/'+email);
  }

  public setNewPassword(hash:string, password:string):Observable<any> {
    return this.http.post(this.AuthenticationURL+'/set_password/'+hash, password);
  }

  public updateProfileInfo(user: TokenPayload){
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.put(this.AuthenticationURL+'/update_profile/', user, httpOptions).toPromise().then((resp:TokenResponse)=>{
      if(resp.token)
      this.saveToken(resp.token)
    }, 
    err=>{
      
    });
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    return throwError(
    `${error.error.message}`);
    };
  }

  private getHeaders()
   {
     return new HttpHeaders({
       'Content-Type':  'application/json',
       'Authorization': `Bearer ${this.getToken()}`
     })
   }
}