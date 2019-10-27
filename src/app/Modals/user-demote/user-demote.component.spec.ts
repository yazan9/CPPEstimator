import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDemoteComponent } from './user-demote.component';

describe('UserDemoteComponent', () => {
  let component: UserDemoteComponent;
  let fixture: ComponentFixture<UserDemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
