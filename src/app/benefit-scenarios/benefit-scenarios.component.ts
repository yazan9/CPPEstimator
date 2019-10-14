import { Component, OnInit} from '@angular/core';
import { BenefitScenario } from '../BenefitScenario';
import {AddScenarioModalComponent} from '../add-scenario-modal/add-scenario-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../Models/Result';
import { CalculatorService } from '../services/calculator.service';
import { Subscription } from 'rxjs';
import { Profile } from '../Models/Profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-benefit-scenarios',
  templateUrl: './benefit-scenarios.component.html',
  styleUrls: ['./benefit-scenarios.component.sass']
})
export class BenefitScenariosComponent implements OnInit {
  
  benefitScenarios: BenefitScenario[];
  selectedScenario: BenefitScenario;
  NewScenario: BenefitScenario;
  subscription: Subscription;
  Profile: Profile;

  constructor(
    private modalService: NgbModal,
    private CalculatorService: CalculatorService,
    private router: Router
    ) { }

  ngOnInit() {
    this.NewScenario = {StopWork: null, StartBenefit: null, BenefitValue: 0};
    this.Profile = this.CalculatorService.getProfile();
    this.benefitScenarios = this.Profile.Scenarios;
  }
  
  onSelect(scenario: BenefitScenario): void {
    this.selectedScenario = scenario;
  }
  
  onDelete(scenario: BenefitScenario): void {
    const index: number = this.benefitScenarios.indexOf(scenario);
    if (index !== -1) {
        this.benefitScenarios.splice(index, 1);
    }      
  }
  
  openModal()
  {
    const modalRef = this.modalService.open(AddScenarioModalComponent);
    modalRef.componentInstance.NewScenario = this.NewScenario;
    
    modalRef.result.then((result) => {
      if (result === Result.Success) {
        this.ProcessNewScenario();
      }}, (reason) => {}
  );
  }

  ProcessNewScenario()
  {
    this.NewScenario.StartBenefit = new Date (this.NewScenario.StartBenefit);
    this.NewScenario.StopWork = new Date(this.NewScenario.StopWork);
    this.Profile.Scenarios.push(this.NewScenario);

    this.CalculatorService.getBenefitsForScenario().subscribe(calculatedBenefits => {
      this.NewScenario = this.Profile.Scenarios.pop();
      this.NewScenario.BenefitValue = calculatedBenefits;
      this.benefitScenarios.push(this.NewScenario);
      this.NewScenario = {StopWork: null, StartBenefit: null, BenefitValue: 0};
    },
    error => {
      if(error.status === 401)
      {
        this.router.navigateByUrl('/login');
      }
    }
    );
  }
  
  Clear()
  {
    this.Profile.Scenarios = [];
    this.benefitScenarios = this.Profile.Scenarios;
  }
}
