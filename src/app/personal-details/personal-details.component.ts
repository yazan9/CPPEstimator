import { Component, OnInit } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.sass']
})
export class PersonalDetailsComponent implements OnInit {
  
  DateOfBirth: string;

  constructor(private CalculatorService: CalculatorService) {
    
  }

  ngOnInit() {
  }
  
  onTextChange(searchValue: string): void {  
    if(this.VerifyDateOfBirth() === true)
    {
      this.CalculatorService.SetDateOfBirth(new Date(this.DateOfBirth));
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
