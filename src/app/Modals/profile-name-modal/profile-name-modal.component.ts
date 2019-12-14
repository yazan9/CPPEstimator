import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-profile-name-modal',
  templateUrl: './profile-name-modal.component.html',
  styleUrls: ['./profile-name-modal.component.sass']
})
export class ProfileNameModalComponent implements OnInit {

  profileName:string = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  Done()
  {
    this.activeModal.close(this.profileName);
  }

}
