import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Profile } from '../Models/Profile';
import { AuthenticationService } from './authentication.service';
import { BenefitScenario } from '../BenefitScenario';
import * as moment from 'moment';

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
  private ProfileSource = new Subject<Profile>();
  
  // Observable string streams
  DateOFBirth$ = this.DateOfBirthSource.asObservable();
  CheckValidDateOfBirth$ = this.ValidateDateOfBirthSource.asObservable();
  UpdatedBenefitValues$ = this.UpdatedBenefitValuesSource.asObservable();
  ProfileLoaded$ = this.ProfileSource.asObservable();
  
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
  
  private VerifyDateOfBirth(DateOfBirth:string): boolean
  {
    var regEx = /^\d{4}-\d{2}$/;
    if(!DateOfBirth.match(regEx)) return false;  // Invalid format
    var d = new Date(DateOfBirth);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,7) === DateOfBirth;
  }

  public onTextChange(text:string): void {  
    if(this.VerifyDateOfBirth(text) === true)
    {
      this.IsValidDateOfBirth = true;
      this.SetDateOfBirth(moment(text).toDate());
    }
    else
    {
      this.InvalidateDateOfBirth();
    }
  }

  public isValidDateOfBirth():boolean{
    return this.IsValidDateOfBirth;
  }

  getProfile(): Profile
  {
    return this.Profile;
  }

  reloadProfile(profile): void{
    this.Profile = profile;
    //remove the zone value from the BE
    this.Profile.DateOfBirth = new Date(this.Profile.DateOfBirth);
    //if this is a new profile
    if(moment(profile.DateOfBirth).format('YYYY-MM') === moment(new Date()).format('YYYY-MM'))
      this.IsValidDateOfBirth = false;
    else
      //this.SetDateOfBirth(moment(profile.DateOfBirth).toDate());
      this.IsValidDateOfBirth = true;

    this.ProfileSource.next(profile);
  }

  updateProfileId(id:number){
    this.Profile.Id = id;
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

  getGridScenarios(gridProfile:Profile):Observable<number[]>
  {    
    let params:HttpParams = new HttpParams()
      .set("Profile", JSON.stringify(gridProfile)).set("BulkCalculation", JSON.stringify(true));

    const httpOptions = {
      headers: this.getHeaders()
    };

    return this.http.post<number[]>(this.CalculatorUrl + '/grid_scenarios', gridProfile, httpOptions);
  }
  
  private getHeaders()
  {
    return new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    })
  }

}
