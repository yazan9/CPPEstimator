import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.sass']
})
export class UserDeleteComponent implements OnInit {

  @Input() public DeletedUser: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  Save()
  {
    this.userService.deleteUser(this.DeletedUser);
    this.activeModal.close(Result.Success);
  }
}
