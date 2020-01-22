import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.sass']
})
export class ChangePasswordModalComponent implements OnInit {

  password:string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  Done()
  {
    this.activeModal.close(this.password);
  }

  Cancel()
  {
    this.activeModal.close(false);
  }

}
