import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-user-activate',
  templateUrl: './user-activate.component.html',
  styleUrls: ['./user-activate.component.sass']
})
export class UserActivateComponent implements OnInit {

  @Input() public ActivatedUser: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  Save()
  {
    this.userService.activateUser(this.ActivatedUser);
    this.activeModal.close(Result.Success);
  }

}
