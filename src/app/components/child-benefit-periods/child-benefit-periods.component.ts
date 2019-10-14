import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewChildBenefitComponent } from 'src/app/Modals/new-child-benefit/new-child-benefit.component';
import { Result } from 'src/app/Models/Result';
import { Child } from 'src/app/Models/Child';
import { Subscription } from 'rxjs';
import { CalculatorService } from 'src/app/services/calculator.service';
import { Profile } from 'src/app/Models/Profile';

@Component({
  selector: 'app-child-benefit-periods',
  templateUrl: './child-benefit-periods.component.html',
  styleUrls: ['./child-benefit-periods.component.sass']
})
export class ChildBenefitPeriodsComponent implements OnInit {

  Children: Child[];
  selectedChild: Child;
  NewChild: Child;
  subscription: Subscription;
  Profile: Profile;

  constructor(
    private modalService: NgbModal,
    private calculatorService: CalculatorService
    ) { }

  ngOnInit() {
      this.NewChild = new Child();
      this.Profile = this.calculatorService.getProfile();
      this.Children = this.Profile.Children;
  }

  onSelect(child: Child): void {
    this.selectedChild = child;
  }
  
  onDelete(child: Child): void {
    const index: number = this.Children.indexOf(child);
    if (index !== -1) {
        this.Children.splice(index, 1);
    }      
  }

  Clear()
  {
    this.Profile.Children = [];
    this.Children = this.Profile.Children;
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

  ProcessNewChild()
  {
    const offset = new Date().getTimezoneOffset();

    //reformat in the correct Date format in relation to UTC

    //Birth Date
    this.NewChild.BirthDate = new Date(this.NewChild.BirthDate);
    this.NewChild.BirthDate.setMinutes(this.NewChild.BirthDate.getMinutes() + offset);

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

    console.log(this.NewChild);

    this.Profile.Children.push(this.NewChild);
    
    this.NewChild = new Child();
  }
}
