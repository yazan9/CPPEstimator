import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  isAdmin: boolean;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
  }

}
