import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/Models/Result';
import { Child } from 'src/app/Models/Child';
import * as moment from 'moment';

@Component({
  selector: 'app-new-child-benefit',
  templateUrl: './new-child-benefit.component.html',
  styleUrls: ['./new-child-benefit.component.sass']
})
export class NewChildBenefitComponent implements OnInit {

  @Input() public NewChild:Child;
  ChildInputType:string;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.ChildInputType = "FullMode";
  }

  Save()
  {
    if(this.ChildInputType === "FullMode")
    {
      this.NewChild.PartialBenefitStart = null;
      this.NewChild.PartialBenefitEnd = null;
    }
    if(this.ChildInputType === "PartialMode")
    {
      //do something after clarifying requirements
    }
    this.activeModal.close(Result.Success);
  }

  onBirthDateSelected(val){
    this.NewChild.BirthDate = moment(val).toDate();
  }

  onAdoptionDateSelected(val){
    this.NewChild.AdoptionDate = moment(val).toDate();
  }
}
