import { Component, OnInit, OnDestroy } from '@angular/core';
import { Earning } from '../Earning';
import { Subscription }   from 'rxjs';
import { CalculatorService } from '../services/calculator.service';
import { Profile } from '../Models/Profile';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.sass']
})
export class EarningsComponent implements OnInit, OnDestroy {
  
  YearOfBirth: number
  //Earnings: Earning[];
  CurrentYear: number;
  Profile: Profile;
  IsValidDateOfBirth:boolean = false;
  loadingMaxAllResponse:boolean = false;
  loadingMaxYearResponse:boolean = false;
  toggledYear:string;

  subscription: Subscription;
  DOBValidySubscription: Subscription;
  profileSubscription:Subscription;

  constructor(
    private CalculatorService: CalculatorService,
    private router: Router) {

    this.subscription = CalculatorService.DateOFBirth$.subscribe(
      DOB => {
        this.YearOfBirth = DOB.getFullYear();

        //clear all earnings, if any
        this.Profile.Earnings = [];

        //point be reference
        //this.Earnings = this.Profile.Earnings;
        for (let i = this.YearOfBirth + 18; i <= this.YearOfBirth+70; i++) {
          this.Profile.Earnings.push(new Earning({Year: i.toString(), Value: 0}));
    }
    });

    this.DOBValidySubscription = CalculatorService.CheckValidDateOfBirth$.subscribe(
      (isValidDateOfBirth) => {
        if(!isValidDateOfBirth)
        {
        this.Profile.Earnings = [];
        //this.Earnings = this.Profile.Earnings;
        }
        this.IsValidDateOfBirth = isValidDateOfBirth;
      }
    );

    this.profileSubscription = this.CalculatorService.ProfileLoaded$.subscribe((profile)=>{
      this.reloadProfile(profile);
     })
    }

  ngOnInit() {
    this.Profile = this.CalculatorService.getProfile();    
    this.CurrentYear = new Date().getFullYear();
  }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.DOBValidySubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  reloadProfile(profile:Profile){
    this.YearOfBirth = moment(profile.DateOfBirth).year();
    this.Profile = profile;
    this.IsValidDateOfBirth = this.CalculatorService.isValidDateOfBirth();
  }

  ToggleMaximize(earning: Earning, event:any):void{
    if(event.target.checked)
    {
      this.loadingMaxYearResponse = true
      this.toggledYear = earning.Year;
      this.CalculatorService.getYearMax(earning.Year)
      .subscribe(
        maxEarning => {
        earning.Value = +maxEarning;
        earning.Selected = true;
        this.loadingMaxYearResponse = false;
        console.log("Recalculating:001");
        this.CalculatorService.recalculateBenefitScenarios();
      },
        error => {
          this.loadingMaxYearResponse = false;

          if(error.status === 401)
          {
            this.router.navigateByUrl('/login');
          }
        }
      );
    }
    else
      earning.Selected = false;
  }

  MaximizeAll():void{
    this.loadingMaxAllResponse = true;
    this.CalculatorService.getMaximumEarnings()
    .subscribe(AllEarnings => {
      this.Profile.Earnings.forEach((earning, i) => {
        earning.Value = AllEarnings[i];
        earning.Selected = true;
      });
      this.loadingMaxAllResponse = false;
      console.log("Recalculating:002");
      this.CalculatorService.recalculateBenefitScenarios();
    },
    error => {
      this.loadingMaxAllResponse = false;
      if(error.status === 401)
      {
        this.router.navigateByUrl('/login');
      }
    }
    );
  }

  onEarningChange()
  {
    this.CalculatorService.recalculateBenefitScenarios();
  }

  ClearAll(): void{
    for(let earning of this.Profile.Earnings)
    {
      earning.Value = 0;
      earning.Selected = false;
    }
  }

  RemoveSelection(earning:Earning){
    earning.Selected = false;
  }
}
