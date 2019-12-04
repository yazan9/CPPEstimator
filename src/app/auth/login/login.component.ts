import { Component, OnInit } from '@angular/core';
import { TokenPayload, AuthenticationService } from 'src/app/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  errorMessage = "";
  loadingResponse:boolean = false;
  reset_password:boolean;

  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    if(this.auth.isLoggedIn() === true){
      this.router.navigate(['/main']);
    }
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params.redirect);
      console.log(params.redirect == 'reset_password');
      this.reset_password = (params.redirect == 'reset_password');
    });
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
