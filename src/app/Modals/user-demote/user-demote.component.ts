import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-user-demote',
  templateUrl: './user-demote.component.html',
  styleUrls: ['./user-demote.component.sass']
})
export class UserDemoteComponent implements OnInit {

  @Input() public DemotedUser: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  Save()
  {
    this.userService.demoteUser(this.DemotedUser);
    this.activeModal.close(Result.Success);
  }

}
