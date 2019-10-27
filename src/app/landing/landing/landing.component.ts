import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  isAdmin: boolean;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
  }

}
