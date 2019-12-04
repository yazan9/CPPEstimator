import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  errorMessage:string = "";
  loadingResponse:boolean = false;
  resetSuccessful:boolean = true;
  hash:string;
  password: string;
  confirmPassword:string;
  passwordsMatch: boolean = true;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    if(this.auth.isLoggedIn() === true){
      this.router.navigate(['/main']);
    }
   }

  ngOnInit() {
    this.hash = this.route.snapshot.paramMap.get('hash');
  }

  checkPasswordsMatch()
  {
    if(this.password=='' || this.confirmPassword=='')
    return;
    this.passwordsMatch = (this.password === this.confirmPassword)
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
    this.auth.setNewPassword(this.hash, this.password).subscribe(() => {
      this.loadingResponse = false;
      this.resetSuccessful = true;
      this.router.navigate(['/login'], {queryParams:{redirect:'reset_password'}})
    }, (err) => {
      this.errorMessage = "Something went wrong. Please try again in a bit";
      this.loadingResponse = false;
      this.resetSuccessful = false;
    });
  }
}
