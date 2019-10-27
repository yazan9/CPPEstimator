import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/Models/User';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Result } from 'src/app/Models/Result';

@Component({
  selector: 'app-user-promote',
  templateUrl: './user-promote.component.html',
  styleUrls: ['./user-promote.component.sass']
})
export class UserPromoteComponent implements OnInit {

  @Input() public PromotedUser: User;

  constructor(public activeModal: NgbActiveModal, private userService: UserService) { }

  ngOnInit() {
  }

  Save()
  {
    this.userService.promoteUser(this.PromotedUser);
    this.activeModal.close(Result.Success);
  }

}
