import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNameModalComponent } from './profile-name-modal.component';

describe('ProfileNameModalComponent', () => {
  let component: ProfileNameModalComponent;
  let fixture: ComponentFixture<ProfileNameModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileNameModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileNameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
