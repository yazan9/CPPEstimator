import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../Models/Profile';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  private CalculatorUrl:string
  env = environment;

  Profile: Profile;

  // Observable string sources
  private DateOfBirthSource = new Subject<Date>();
  
  // Observable string streams
  DateOFBirth$ = this.DateOfBirthSource.asObservable();
  
  // Service Commands
  SetDateOfBirth(DOB: Date)
  {
    this.Profile.DateOfBirth = DOB;
    this.DateOfBirthSource.next(DOB);
  }

  getProfile(): Profile
  {
    return this.Profile;
  }

  constructor(private http: HttpClient, private authService : AuthenticationService) {
    this.CalculatorUrl = `${this.env.backendUri}/calculator`;
    this.Profile = new Profile();
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

  getYearMax(Year:string): Observable<Number>
  {
    let params:HttpParams = new HttpParams()
      .set("Year", Year)
      .set("BirthDate", this.Profile.DateOfBirth.toISOString());

      const httpOptions = {
        headers: this.getHeaders(), params:params
      };

    return this.http.get<Number>(this.CalculatorUrl + '/yearmax', httpOptions);
  }

  getMaximumEarnings():Observable<number[]>
  {
    let params:HttpParams = new HttpParams()
      .set("BirthDate", this.Profile.DateOfBirth.toISOString());

    const httpOptions = {
      headers: this.getHeaders(), params:params
     };

    return this.http.get<number[]>(this.CalculatorUrl + '/allmax', httpOptions);
  }

  getBenefitsForScenario()
  {
    let params:HttpParams = new HttpParams()
      .set("Profile", JSON.stringify(this.Profile));

    const httpOptions = {
      headers: this.getHeaders(), params:params
    };

    return this.http.get<number>(this.CalculatorUrl + '/scenario_benefits', httpOptions);
  }

}
