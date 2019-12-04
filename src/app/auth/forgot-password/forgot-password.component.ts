import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  errorMessage:string = "";
  loadingResponse:boolean = false;
  resetSuccessful:boolean = false;
  targetEmail:string= '';

  constructor(private auth: AuthenticationService, private router: Router) {
    if(this.auth.isLoggedIn() === true){
      this.router.navigate(['/main']);
    }
   }

  ngOnInit() {
  }

  reset(resetForm : any) {
    //make sure that inputs are valid
    if (resetForm.invalid) { 
      Object.keys( resetForm.controls).forEach(key => {
        resetForm.controls[key].markAsDirty();
      });
      return;
    }
    
    //if all is well, call the service function
    this.loadingResponse = true;
    this.auth.resetPassword(this.targetEmail).subscribe(() => {
      this.loadingResponse = false;
      this.resetSuccessful = true;
    }, (err) => {
      this.errorMessage = "Something went wrong. Please try again in a bit";
      this.loadingResponse = false;
      this.resetSuccessful = false;
    });
  }

}
