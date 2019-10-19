import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/Models/Result';
import { NewDisabilityPeriodComponent } from 'src/app/Modals/new-disability-period/new-disability-period.component';
import { DisabilityPeriod } from 'src/app/Models/DisabilityPeriod';
import { Subscription } from 'rxjs';
import { Profile } from 'src/app/Models/Profile';
import { CalculatorService } from 'src/app/services/calculator.service';

@Component({
  selector: 'app-disability-periods',
  templateUrl: './disability-periods.component.html',
  styleUrls: ['./disability-periods.component.sass']
})
export class DisabilityPeriodsComponent implements OnInit {

  DisabilityPeriods: DisabilityPeriod[];
  selectedDisabilityPeriod: DisabilityPeriod;
  NewDisabilityPeriod: DisabilityPeriod;
  subscription: Subscription;
  Profile: Profile;
  IsValidDateOfBirth:boolean = false;

  constructor(
    private modalService: NgbModal,
    private calculatorService: CalculatorService
    ) {
      this.subscription = calculatorService.CheckValidDateOfBirth$.subscribe(
        (isValidDateOfBirth) => {
          if(!isValidDateOfBirth)
          {
          this.Profile.DisabilityPeriods = [];
          this.DisabilityPeriods = this.Profile.DisabilityPeriods;
          }
          this.IsValidDateOfBirth = isValidDateOfBirth;
        }
      );
     }

  ngOnInit() {
    this.NewDisabilityPeriod = {StartDisability: null, EndDisability: null};
    this.Profile = this.calculatorService.getProfile();
    this.DisabilityPeriods = this.Profile.DisabilityPeriods;
  }

  onSelect(disabilityPeriod: DisabilityPeriod): void {
    this.selectedDisabilityPeriod = disabilityPeriod;
  }
  
  onDelete(disabilityPeriod: DisabilityPeriod): void {
    const index: number = this.DisabilityPeriods.indexOf(disabilityPeriod);
    if (index !== -1) {
        this.DisabilityPeriods.splice(index, 1);
        this.calculatorService.recalculateBenefitScenarios();
    }      
  }

  Clear()
  {
    this.Profile.DisabilityPeriods = [];
    this.DisabilityPeriods = this.Profile.DisabilityPeriods;
    this.calculatorService.recalculateBenefitScenarios();
  }

  openModal()
  {
    const modalRef = this.modalService.open(NewDisabilityPeriodComponent);
    modalRef.componentInstance.NewDisabilityPeriod = this.NewDisabilityPeriod;
    
    modalRef.result.then((result) => {
      if (result === Result.Success) {
        this.ProcessNewDisabilityPeriod();
      }}, (reason) => {}
  );
  }

  ProcessNewDisabilityPeriod()
  {
    //reformat in the correct Date format
    this.NewDisabilityPeriod.StartDisability = new Date (this.NewDisabilityPeriod.StartDisability);
    this.NewDisabilityPeriod.EndDisability = new Date(this.NewDisabilityPeriod.EndDisability);

    this.Profile.DisabilityPeriods.push(this.NewDisabilityPeriod);

    this.calculatorService.recalculateBenefitScenarios();
    
    this.NewDisabilityPeriod = {StartDisability: null, EndDisability: null};
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }
}
