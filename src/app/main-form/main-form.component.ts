import { Component, OnInit } from '@angular/core';
import {MainFormServiceService} from '../main-form-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.sass'],
  providers: [MainFormServiceService]
})
export class MainFormComponent implements OnInit {
  
  constructor(
    private MainService: MainFormServiceService, 
    public auth: AuthenticationService, 
    private router: Router, 
    private calculatorService: CalculatorService) { }

  ngOnInit() {
  }

  generateFullReport():void{
    localStorage.setItem('Profile', JSON.stringify(this.calculatorService.getProfile()));
    this.router.navigate(['/benefits_report']);  
  }
}
