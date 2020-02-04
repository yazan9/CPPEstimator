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
  
  //benefitScenarios: BenefitScenario[];
  selectedScenario: BenefitScenario;
  NewScenario: BenefitScenario;
  Profile: Profile;
  IsValidDateOfBirth:boolean;

  subscription: Subscription;
  updatedCalculationsSubscription:Subscription;
  profileSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private CalculatorService: CalculatorService,
    private router: Router
    ) { 
      this.subscription = CalculatorService.CheckValidDateOfBirth$.subscribe(
        (isValidDateOfBirth) => {
          if(!isValidDateOfBirth)
          {
          this.Profile.Scenarios = [];
          //this.benefitScenarios = this.Profile.Scenarios;
          }
          this.IsValidDateOfBirth = isValidDateOfBirth;
        }
      );

      this.updatedCalculationsSubscription = CalculatorService.UpdatedBenefitValues$.subscribe(
        (updatedBenefits) => {
          this.Profile.Scenarios.forEach((scenario, index) => {
            scenario.BenefitValue = updatedBenefits[index];
          });
        }
      );

      this.profileSubscription = this.CalculatorService.ProfileLoaded$.subscribe((profile)=>{
        this.reloadProfile(profile);
      })
    }

  ngOnInit() {
    this.NewScenario = {StopWork: null, StartBenefit: null, BenefitValue: 0};
    this.Profile = this.CalculatorService.getProfile();
    //this.benefitScenarios = this.Profile.Scenarios;
  }
  
  onSelect(scenario: BenefitScenario): void {
    this.selectedScenario = scenario;
  }
  
  onDelete(scenario: BenefitScenario): void {
    const index: number = this.Profile.Scenarios.indexOf(scenario);
    if (index !== -1) {
        this.Profile.Scenarios.splice(index, 1);
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
    this.CalculatorService.getBenefitsForScenario().subscribe((calculatedBenefits) => {
      
      //this.Profile.Scenarios.push(this.NewScenario);
      this.NewScenario = this.Profile.Scenarios.pop();
      this.NewScenario.BenefitValue = calculatedBenefits.pop();
      //this.benefitScenarios.push(this.NewScenario);
      this.Profile.Scenarios.push(this.NewScenario);
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

  reloadProfile(profile:Profile){
    this.Profile = profile;
    this.IsValidDateOfBirth = this.CalculatorService.isValidDateOfBirth();
  }
  
  Clear()
  {
    this.Profile.Scenarios = [];
    //this.benefitScenarios = this.Profile.Scenarios;
  }
}
