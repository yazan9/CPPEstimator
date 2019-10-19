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
  IsValidDateOfBirth:boolean = false;

  // Observable string sources
  private DateOfBirthSource = new Subject<Date>();
  private ValidateDateOfBirthSource = new Subject<boolean>();
  private UpdatedBenefitValuesSource = new Subject<number[]>();
  
  // Observable string streams
  DateOFBirth$ = this.DateOfBirthSource.asObservable();
  CheckValidDateOfBirth$ = this.ValidateDateOfBirthSource.asObservable();
  UpdatedBenefitValues$ = this.UpdatedBenefitValuesSource.asObservable();
  
  constructor(private http: HttpClient, private authService : AuthenticationService) {
    this.CalculatorUrl = `${this.env.backendUri}/calculator`;
    this.Profile = new Profile();
  }

  // Service Commands
  SetDateOfBirth(DOB: Date)
  {
    this.Profile.DateOfBirth = DOB;
    this.IsValidDateOfBirth = true;
    this.DateOfBirthSource.next(DOB);
    this.ValidateDateOfBirthSource.next(true);
  }

  InvalidateDateOfBirth()
  {
    this.Profile.Earnings = [];

    //send the signal only if changed from true to false
    if(this.IsValidDateOfBirth)
    {
      this.ValidateDateOfBirthSource.next(false);
      this.IsValidDateOfBirth = false;
    }
  }

  getProfile(): Profile
  {
    return this.Profile;
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
    .set("Profile", JSON.stringify(this.Profile)).set("BulkCalculation", JSON.stringify(false));

    const httpOptions = {
      headers: this.getHeaders(), params:params
    };

    return this.http.get<number[]>(this.CalculatorUrl + '/scenario_benefits', httpOptions);
  }

  recalculateBenefitScenarios()
  {
    if(this.Profile.Scenarios.length == 0)
      return;
    
    let params:HttpParams = new HttpParams()
      .set("Profile", JSON.stringify(this.Profile)).set("BulkCalculation", JSON.stringify(true));

    const httpOptions = {
      headers: this.getHeaders(), params:params
    };

    this.http.get<number[]>(this.CalculatorUrl + '/scenario_benefits', httpOptions).subscribe(
      (benefitValues) => {
        this.UpdatedBenefitValuesSource.next(benefitValues);
      }, 
      (err) => {

      }
    );
  }

  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

}
