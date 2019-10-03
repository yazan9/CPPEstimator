import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  errorMessage = "";

  loadingResponse:boolean = false;
  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router) {
    if(this.auth.isLoggedIn() === true){
      //this.router.navigateByUrl(`/profile/${this.auth.getUserDetails().id}`);
    }
   }

  ngOnInit() {
  }

  login(loginForm : any) {
    //make sure that inputs are valid
    if (loginForm.invalid) { 
      Object.keys( loginForm.controls).forEach(key => {
       loginForm.controls[key].markAsDirty();
      });
      return;
    }
    
    //if all is well, call the service function
    this.loadingResponse = true;
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl("/");
      this.loadingResponse = false;
    }, (err) => {
      this.errorMessage = "Login Failed";
      this.loadingResponse = false;
    });
  }
}
