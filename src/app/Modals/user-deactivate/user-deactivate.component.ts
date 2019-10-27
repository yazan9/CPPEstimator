import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-user-deactivate',
  templateUrl: './user-deactivate.component.html',
  styleUrls: ['./user-deactivate.component.sass']
})
export class UserDeactivateComponent implements OnInit {

  @Input() public DeactivatedUser: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  Save()
  {
    this.userService.deactivateUser(this.DeactivatedUser);
    this.activeModal.close(Result.Success);
  }

}
