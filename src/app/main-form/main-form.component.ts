import { Component, OnInit } from '@angular/core';
import { BenefitScenarios } from '../MockBenefitScenarios';
import {MainFormServiceService} from '../main-form-service.service';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.sass'],
  providers: [MainFormServiceService]
})
export class MainFormComponent implements OnInit {
  
  benefitScenarios = BenefitScenarios;

  constructor(private MainService: MainFormServiceService) { }

  ngOnInit() {
  }

}
