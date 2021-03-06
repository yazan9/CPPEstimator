import { Component, OnInit, OnDestroy } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Profile } from '../Models/Profile';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.sass']
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  
  DateOfBirth: string;
  profileSubscription:Subscription;
  Profile:Profile;

  constructor(private CalculatorService: CalculatorService) {
    
  }

  ngOnInit() {
    this.profileSubscription = this.CalculatorService.ProfileLoaded$.subscribe((profile:Profile) => {
      if(this.CalculatorService.isValidDateOfBirth())
        this.DateOfBirth = moment(profile.DateOfBirth).format('YYYY-MM');
      else{
        this.DateOfBirth = '';
      }

      //if this is a new profile    
      this.Profile = profile;
    })

    this.Profile = this.CalculatorService.getProfile();    
  }

  ngOnDestroy(){
    this.profileSubscription.unsubscribe();
  }

  onDateSelected(val){
    this.CalculatorService.onTextChange(val);
    moment(val).format('YYYY-MM');
  }
}
