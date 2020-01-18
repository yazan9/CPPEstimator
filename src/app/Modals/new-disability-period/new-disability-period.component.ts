import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/Models/Result';
import { DisabilityPeriod } from 'src/app/Models/DisabilityPeriod';
import * as moment from 'moment';

@Component({
  selector: 'app-new-disability-period',
  templateUrl: './new-disability-period.component.html',
  styleUrls: ['./new-disability-period.component.sass']
})
export class NewDisabilityPeriodComponent implements OnInit {

  @Input() public NewDisabilityPeriod: DisabilityPeriod;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  Save()
  {
    this.activeModal.close(Result.Success);
  }

  onDisabilityEndSelected(val){
    this.NewDisabilityPeriod.EndDisability = moment(val).toDate();
  }

  onDisabilityStartSelected(val){
    this.NewDisabilityPeriod.StartDisability = moment(val).toDate();
  }

}
