import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadProfileModalComponent } from './load-profile-modal.component';

describe('LoadProfileModalComponent', () => {
  let component: LoadProfileModalComponent;
  let fixture: ComponentFixture<LoadProfileModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadProfileModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
