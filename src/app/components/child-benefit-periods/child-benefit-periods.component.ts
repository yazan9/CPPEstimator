import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewChildBenefitComponent } from 'src/app/Modals/new-child-benefit/new-child-benefit.component';
import { Result } from 'src/app/Models/Result';
import { Child } from 'src/app/Models/Child';
import { Subscription } from 'rxjs';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Profile } from 'src/app/Models/Profile';
import * as moment from 'moment';

@Component({
  selector: 'app-child-benefit-periods',
  templateUrl: './child-benefit-periods.component.html',
  styleUrls: ['./child-benefit-periods.component.sass']
})
export class ChildBenefitPeriodsComponent implements OnInit {

  selectedChild: Child;
  NewChild: Child;
  Profile: Profile;
  IsValidDateOfBirth:boolean = false;

  subscription: Subscription;
  profileSubscription: Subscription;

  constructor(
    private modalService: NgbModal,
    private calculatorService: CalculatorService
    ) { 
      this.subscription = calculatorService.CheckValidDateOfBirth$.subscribe(
        (isValidDateOfBirth) => {
          if(!isValidDateOfBirth)
          {
          this.Profile.Children = [];
          }
          this.IsValidDateOfBirth = isValidDateOfBirth;
        }
      );

      this.profileSubscription = this.calculatorService.ProfileLoaded$.subscribe((profile)=>{
        this.reloadProfile(profile);
      })
    }

  ngOnInit() {
      this.NewChild = new Child();
      this.Profile = this.calculatorService.getProfile();
  }

  onSelect(child: Child): void {
    this.selectedChild = child;
  }
  
  onDelete(child: Child): void {
    const index: number = this.Profile.Children.indexOf(child);
    if (index !== -1) {
        this.Profile.Children.splice(index, 1);
        this.calculatorService.recalculateBenefitScenarios();     
    }
  }

  Clear()
  {
    this.Profile.Children = [];
    this.calculatorService.recalculateBenefitScenarios();
  }

  openModal()
  {
    const modalRef = this.modalService.open(NewChildBenefitComponent, {size:'lg'});
    modalRef.componentInstance.NewChild = this.NewChild;
    
    modalRef.result.then((result) => {
      if (result === Result.Success) {
        this.ProcessNewChild();
      }}, (reason) => {}
  );
  }

  reloadProfile(profile:Profile){
    this.Profile = profile;
    this.IsValidDateOfBirth = this.calculatorService.isValidDateOfBirth();
  }

  ProcessNewChild()
  {
    const offset = new Date().getTimezoneOffset();

    //reformat in the correct Date format in relation to UTC

    //Birth Date
    this.NewChild.BirthDate = new Date(this.NewChild.BirthDate);
    this.NewChild.BirthDate.setMinutes(this.NewChild.BirthDate.getMinutes() + offset);
    console.log(this.NewChild.BirthDate);

    //StartBenefits Date
    this.NewChild.StartBenefit = new Date(this.NewChild.BirthDate);
    this.NewChild.StartBenefit.setMonth(this.NewChild.BirthDate.getMonth()+1);

    //End Benefits Date
    this.NewChild.EndBenefit = new Date(this.NewChild.StartBenefit);
    this.NewChild.EndBenefit.setMonth(this.NewChild.StartBenefit.getMonth()+83);

    //Adoption Date
    if(this.NewChild.AdoptionDate != null)
    {
      this.NewChild.AdoptionDate = new Date(this.NewChild.AdoptionDate);
      this.NewChild.AdoptionDate.setMinutes(this.NewChild.AdoptionDate.getMinutes() + offset);
      this.NewChild.StartBenefit = new Date(this.NewChild.AdoptionDate);
      this.NewChild.StartBenefit.setMonth(this.NewChild.AdoptionDate.getMonth()+1);
    }

    this.Profile.Children.push(this.NewChild);

    this.calculatorService.recalculateBenefitScenarios();
    
    this.NewChild = new Child();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  showStartBenefit(DOB:Date):string{
    return moment(DOB).add(1, 'months').format('YYYY-MM');
  }

  showEndBenefit(DOB:Date):string{
    return moment(DOB).add(84,'months').format('YYYY-MM');
  }
}
