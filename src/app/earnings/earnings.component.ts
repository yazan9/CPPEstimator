import { Component, OnInit, OnDestroy } from '@angular/core';
import { Earning } from '../Earning';
import { Subscription }   from 'rxjs';
import { CalculatorService } from '../services/calculator.service';
import { Profile } from '../Models/Profile';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.sass']
})
export class EarningsComponent implements OnInit, OnDestroy {
  
  YearOfBirth: number
  MonthOfBirth: number
  Earnings: Earning[];
  CurrentYear: number;
  subscription: Subscription;
  Profile: Profile;

  constructor(
    private CalculatorService: CalculatorService) {

    this.subscription = CalculatorService.DateOFBirth$.subscribe(
      DOB => {
        this.YearOfBirth = DOB.getFullYear();
        this.MonthOfBirth = DOB.getMonth();
        this.CurrentYear = new Date().getFullYear();
        this.Earnings = this.Profile.Earnings;
        for (let i = this.YearOfBirth + 18; i <= this.YearOfBirth+70; i++) {
          this.Earnings.push(new Earning({Year: i.toString(), Value: 0}));
    }
    });
    }

  ngOnInit() {
    this.Profile = this.CalculatorService.getProfile();    
  }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  ToggleMaximize(earning: Earning, event:any):void{
    if(event.target.checked)
    {
      this.CalculatorService.getYearMax(earning.Year)
      .subscribe(maxEarning => {
        earning.Value = +maxEarning;
        earning.Selected = true;
      });
    }
    else
      earning.Selected = false;
  }

  MaximizeAll():void{
    this.CalculatorService.getMaximumEarnings()
    .subscribe(AllEarnings => {
      this.Earnings.forEach((earning, i) => {
        earning.Value = AllEarnings[i];
        earning.Selected = true;
      });
    });
  }

  ClearAll(): void{
    for(let earning of this.Earnings)
    {
      earning.Value = 0;
      earning.Selected = false;
    }
  }

  RemoveSelection(earning:Earning){
    earning.Selected = false;
  }
}
