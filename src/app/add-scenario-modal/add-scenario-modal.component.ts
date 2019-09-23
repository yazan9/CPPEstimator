import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from '../Models/Result';

@Component({
  selector: 'app-add-scenario-modal',
  templateUrl: './add-scenario-modal.component.html',
  styleUrls: ['./add-scenario-modal.component.sass']
})
export class AddScenarioModalComponent implements OnInit {
  
  @Input() public NewScenario;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  Save()
  {
    this.activeModal.close(Result.Success);
  }
}
