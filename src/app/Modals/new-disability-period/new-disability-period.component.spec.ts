import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDisabilityPeriodComponent } from './new-disability-period.component';

describe('NewDisabilityPeriodComponent', () => {
  let component: NewDisabilityPeriodComponent;
  let fixture: ComponentFixture<NewDisabilityPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDisabilityPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDisabilityPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
