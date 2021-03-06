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
  back: any;

  constructor(private auth: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    if(this.auth.isLoggedIn() === true){
      this.router.navigate(['/main']);
    }
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.reset_password = (params.redirect == 'reset_password');
    });

    this.route.queryParams.subscribe(p => {
      if(p.back){
        this.back = p.back;
      }
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
      this.loadingResponse = false;
      if(this.back)
        this.router.navigateByUrl(this.back.toString());
      else
        this.router.navigateByUrl("/");

      return;
      
    }, (err) => {
      this.errorMessage = "Login Failed";
      this.loadingResponse = false;
    });
  }
}
