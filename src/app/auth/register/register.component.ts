import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { registerLocaleData } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  errorMessage = "";

  signedUp:boolean = false;
  loadingResponse:boolean = false;
  
  credentials: TokenPayload = {
    email: '',
    username: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) { 
    if(this.auth.isLoggedIn() === true){
      //this.router.navigateByUrl("/feed");
    }
  }

  ngOnInit() {
  }

  register(registerForm: any) {
//make sure that inputs are valid
if (registerForm.invalid) { 
  Object.keys( registerForm.controls).forEach(key => {
   registerForm.controls[key].markAsDirty();
  });
  return;
}

//if all is well, call the service function
this.loadingResponse = true;
this.auth.register(this.credentials).subscribe(() => {
  this.router.navigateByUrl("/login");
  this.signedUp = true;
  this.loadingResponse = false;
}, (err) => {
  this.errorMessage = "Registration Failed";
  this.loadingResponse = false;
});
  }
}
