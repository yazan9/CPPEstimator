import { Component, OnInit, OnDestroy } from '@angular/core';
import { Earning } from '../Earning';
import {MainFormServiceService} from '../main-form-service.service';
import { Subscription }   from 'rxjs';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.sass']
})
export class EarningsComponent implements OnInit, OnDestroy {
  
  YearOfBirth: number
  Earnings: Earning[];
  CurrentYear: number;
  subscription: Subscription;

  constructor(private MainService: MainFormServiceService) {
    this.subscription = MainService.DateOFBirth$.subscribe(
      DOB => {
        this.YearOfBirth = +DOB;
        this.CurrentYear = new Date().getFullYear();
        this.Earnings = [];
        for (let i = this.YearOfBirth + 18; i <= this.CurrentYear; i++) {
          this.Earnings.push(new Earning({Year: i.toString(), Value: 0}));
    }
    });
    }

  ngOnInit() {
    //this.YearOfBirth = "1983";
    
  }
  
  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
