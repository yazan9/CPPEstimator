import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import {NgbdSortableHeader, SortEvent} from '../../directives/sortable.directive'
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/user.service';
import { DecimalPipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserDeleteComponent } from 'src/app/Modals/user-delete/user-delete.component';
import { Result } from 'src/app/Models/Result';
import { UserActivateComponent } from 'src/app/Modals/user-activate/user-activate.component';
import { UserPromoteComponent } from 'src/app/Modals/user-promote/user-promote.component';
import { UserDemoteComponent } from 'src/app/Modals/user-demote/user-demote.component';
import { UserDeactivateComponent } from 'src/app/Modals/user-deactivate/user-deactivate.component';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass'],
  providers:[DecimalPipe]
})
export class AdminComponent implements OnInit {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  users$: Observable<User[]>;
  total$: Observable<number>;
  private _success = new Subject<string>();
  errorMessage: string;

  constructor(private userService: UserService, private modalService: NgbModal) {
    this.users$ = userService.users$;
    this.total$ = userService.total$;
   }

  ngOnInit() {
    this._success.subscribe((message) => this.errorMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.errorMessage = null);
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.userService.sortColumn = column;
    this.userService.sortDirection = direction;
  }

  onDelete(user: User): void {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.DeletedUser = user;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        
      }
    });
  }

  onPromote(user: User): void {
    const modalRef = this.modalService.open(UserPromoteComponent);
    modalRef.componentInstance.PromotedUser = user;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        
      }
    });
  }

  onDemote(user: User): void {
    const modalRef = this.modalService.open(UserDemoteComponent);
    modalRef.componentInstance.DemotedUser = user;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        
      }
    });
  }

  onActivate(user: User): void {
    const modalRef = this.modalService.open(UserActivateComponent);
    modalRef.componentInstance.ActivatedUser = user;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        
      }
    });
  }

  onDeactivate(user: User): void {
    const modalRef = this.modalService.open(UserDeactivateComponent);
    modalRef.componentInstance.DeactivatedUser = user;

    modalRef.result.then((result) => {
      if (result === Result.Success) {
        
      }
    });
  }

}
