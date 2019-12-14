import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-profile',
  templateUrl: './delete-profile.component.html',
  styleUrls: ['./delete-profile.component.sass']
})
export class DeleteProfileComponent implements OnInit {
  @Input() profileName:string;
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  confirm(){
    this.activeModal.close(true);
  }

  cancel(){
    this.activeModal.close(false);
  }
}
