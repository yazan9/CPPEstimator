import { Component, OnInit } from '@angular/core';
import {MainFormServiceService} from '../main-form-service.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.sass']
})
export class PersonalDetailsComponent implements OnInit {
  
  DateOfBirth: string;

  constructor(private MainService: MainFormServiceService) {
    
  }

  ngOnInit() {
  }
  
  onTextChange(searchValue: string): void {  
    if(this.VerifyDateOfBirth() === true)
    {
      this.MainService.SetDateOfBirth(this.DateOfBirth.slice(0,4));
    }
  }
  
  VerifyDateOfBirth(): boolean
  {
    var regEx = /^\d{4}-\d{2}$/;
    if(!this.DateOfBirth.match(regEx)) return false;  // Invalid format
    var d = new Date(this.DateOfBirth);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,7) === this.DateOfBirth;
  }
}
