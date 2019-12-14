import { Component, OnInit, Input } from '@angular/core';
import { Profile } from 'selenium-webdriver/firefox';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-load-profile-modal',
  templateUrl: './load-profile-modal.component.html',
  styleUrls: ['./load-profile-modal.component.sass']
})
export class LoadProfileModalComponent implements OnInit {

  profiles:Profile[];
  selectedProfile:Profile;
  constructor(public activeModal: NgbActiveModal, private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.getProfiles().subscribe((resp)=>{
      this.profiles = resp.resp;
      if(this.profiles.length)
      this.selectedProfile = this.profiles[0];
    }, (err)=>{
      this.profiles=[];
    });   
  }

  selectProfile(){
    this.activeModal.close(this.selectedProfile);
  }

}
