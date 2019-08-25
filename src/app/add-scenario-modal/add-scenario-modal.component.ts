import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    this.activeModal.close(this.NewScenario);
  }
}
