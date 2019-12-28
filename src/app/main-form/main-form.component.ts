import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {MainFormServiceService} from '../main-form-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router, PRIMARY_OUTLET } from '@angular/router';
import { CalculatorService } from '../services/calculator.service';
import { ProfileService } from '../services/profile.service';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Profile } from '../Models/Profile';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileNameModalComponent } from '../Modals/profile-name-modal/profile-name-modal.component';
import { LoadProfileModalComponent } from '../Modals/load-profile-modal/load-profile-modal.component';
import { DeleteProfileComponent } from '../Modals/delete-profile/delete-profile.component';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.sass'],
  providers: [MainFormServiceService]
})
export class MainFormComponent implements OnInit, OnDestroy, AfterViewInit {  

  staticAlertClosed = false;
  successMessage: string;
  errorMessage:string;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  activeProfile:Profile;
  isValidDateOfBirth:boolean;
  DOBValidySubscription: Subscription;
  profileSubscription:Subscription;
  
  constructor(
    private MainService: MainFormServiceService, 
    public auth: AuthenticationService, 
    private router: Router, 
    private calculatorService: CalculatorService,
    private profileService: ProfileService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(3000)
    ).subscribe(() => this.errorMessage = null);

    this.DOBValidySubscription = this.calculatorService.CheckValidDateOfBirth$.subscribe(
      (isValidDateOfBirth) => {
        this.isValidDateOfBirth = isValidDateOfBirth;
        
      }
    );

    this.profileSubscription = this.calculatorService.ProfileLoaded$.subscribe((profile)=> {
      this.isValidDateOfBirth = this.calculatorService.isValidDateOfBirth();
      if(!this.isValidDateOfBirth)
        this.activeProfile = null;
    })
  }

  ngAfterViewInit(){
    if(sessionStorage.getItem('Profile')){
      let storedProfile = JSON.parse(sessionStorage.getItem('Profile'));
      setTimeout(() => this.calculatorService.reloadProfile(storedProfile));
    }
  }

  generateFullReport():void{
    sessionStorage.setItem('Profile', JSON.stringify(this.calculatorService.getProfile()));
    this.router.navigate(['/benefits_report']);  
  }

  newProfile():void{
    this.calculatorService.reloadProfile(new Profile());
  }

  saveProfileAs():void{
    const modalRef = this.modalService.open(ProfileNameModalComponent);
    
    modalRef.result.then((name) => {
      if(!name) return;
      this.profileService.saveProfile(this.calculatorService.getProfile(), name).subscribe((resp)=>{
        this._success.next('Profile saved successfully');
        this.calculatorService.updateProfileId(resp.resp);
        this.activeProfile = this.calculatorService.getProfile();
        this.activeProfile.ProfileName = name;
        sessionStorage.setItem('profile', JSON.stringify(this.activeProfile));
      }, (err)=>{
        this._error.next('Could not save profile. We are working on it.');
      });
    }, (err)=> {});
  }

  updateProfile(){
    this.profileService.updateProfile(this.calculatorService.getProfile()).subscribe(()=>{
      this._success.next('Profile saved successfully');
      this.activeProfile = this.calculatorService.getProfile();
      sessionStorage.setItem('profile', JSON.stringify(this.calculatorService.getProfile()));
    }, (err)=>{
      this._error.next('Could not save profile. We are working on it.');
    });
  }

  loadProfile(){
    const modalRef = this.modalService.open(LoadProfileModalComponent);
    
    modalRef.result.then((profile) => {
      if(!profile) return;
      this.selectProfile(profile);
    }, (err)=> {});
  }

  selectProfile(profile):void{
    this.profileService.loadProfile(profile.id).subscribe((resp:Profile)=>{
      this.activeProfile = resp;
      this.calculatorService.reloadProfile(resp);
    }, (err)=>{
      this._error.next('Could not load selected profile. We are working on it.');
    });
  }

  deleteProfile(){
    const modalRef = this.modalService.open(DeleteProfileComponent);
    modalRef.componentInstance.profileName = this.activeProfile.ProfileName;
    
    modalRef.result.then((res) => {
      if(!res) return;
      this.profileService.deleteProfile(this.activeProfile.Id).subscribe((result) =>{
        this._success.next('Profile deleted successfully');
        this.newProfile();
      }, 
      (error)=>{
        this._error.next('Could not delete selected profile. We are working on it.');
      })
    }, (err)=> {});
  }

  ngOnDestroy(): void {
    this.DOBValidySubscription.unsubscribe();
  }
}
