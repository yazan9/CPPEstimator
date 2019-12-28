import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private ProfileUrl:string
  env = environment;

  constructor(private authService: AuthenticationService, private http: HttpClient) {
    this.ProfileUrl = `${this.env.backendUri}/profile`;
   }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  public saveProfile(profile, name:string):Observable<any>
  {
    let newProfile = profile;
    newProfile.id = -1;
    const httpOptions = {
      headers: this.getHeaders(), params:{profileName:name}
    };
    return this.http.post(this.ProfileUrl+'/save', newProfile, httpOptions)    
  }

  public updateProfile(profile):Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.put(this.ProfileUrl+'/update/'+profile.Id, profile, httpOptions)    
  }

  public getProfiles():Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.get(this.ProfileUrl+'/getProfiles', httpOptions)    
  }

  public loadProfile(id):Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.get(this.ProfileUrl+`/loadProfile/${id}`, httpOptions)    
  }

  public deleteProfile(id):Observable<any>
  {
    const httpOptions = {
      headers: this.getHeaders()
    };
    return this.http.delete(this.ProfileUrl+`/deleteProfile/${id}`, httpOptions)    
  }
}
