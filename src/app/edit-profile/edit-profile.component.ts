import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails, TokenPayload } from '../services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordModalComponent } from '../Modals/change-password-modal/change-password-modal.component';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.sass']
})
export class EditProfileComponent implements OnInit {

  userDetails: UserDetails
  newPassword:string;

  constructor(
    public auth:AuthenticationService,
    private modalService: NgbModal,
    public toastService: ToastService
    ) { }

  ngOnInit() {
    this.userDetails = this.auth.getUserDetails();
    this.newPassword = '';
  }

  openPasswordModal(){
    const modalRef = this.modalService.open(ChangePasswordModalComponent);
    
    modalRef.result.then((result) => {
      if (!result) return;

      this.newPassword = result; 
  });
}

  Save(){
    let payload:TokenPayload = {email:'', username: this.userDetails.username, password:this.newPassword};
    this.auth.updateProfileInfo(payload).then(() => {
      this.toastService.showSuccess('Profile Updated Successfully');
    }, err=>{
      this.toastService.showDanger('An error occured while updating your profile')
    });
  }
}
