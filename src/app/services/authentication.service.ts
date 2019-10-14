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

  private token: string;
  private AuthenticationURL:string
  env = environment;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient, private router: Router) {
    this.AuthenticationURL = `${this.env.backendUri}`;
   }
  
   private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public logout(): void {
    this.token = '';
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
      //return user.exp > Date.now() / 1000;
      return true;
    } 
    else {
      return false;
    }
  }
  
  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`https://track-my-expenses-chilivote.c9users.io:8081/api/${type}`, user)
      .pipe(
      catchError(this.handleError('register', [])));
    } else {
      base = this.http.get(`https://track-my-expenses-chilivote.c9users.io:8081/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

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
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    return throwError(
    `${error.error.message}`);
    };
  }
}