import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../Models/Profile';

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

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.CalculatorUrl = `${this.env.backendUri}/calculator`;
    this.Profile = new Profile();
  }

  getYearMax(Year:string): Observable<Number>
  {
    let params:HttpParams = new HttpParams()
      .set("Year", Year)
      .set("BirthDate", this.Profile.DateOfBirth.toISOString());

    return this.http.get<Number>(this.CalculatorUrl + '/yearmax', {params: params});
  }

  getMaximumEarnings():Observable<number[]>
  {
    let params:HttpParams = new HttpParams()
      .set("BirthDate", this.Profile.DateOfBirth.toISOString());

    return this.http.get<number[]>(this.CalculatorUrl + '/allmax', {params: params});
  }

  getBenefitsForScenario()
  {
    let params:HttpParams = new HttpParams()
      .set("Profile", JSON.stringify(this.Profile));

    return this.http.get<number>(this.CalculatorUrl + '/scenario_benefits', {params: params});
  }

}
