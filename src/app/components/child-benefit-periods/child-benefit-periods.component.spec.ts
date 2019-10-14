import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildBenefitPeriodsComponent } from './child-benefit-periods.component';

describe('ChildBenefitPeriodsComponent', () => {
  let component: ChildBenefitPeriodsComponent;
  let fixture: ComponentFixture<ChildBenefitPeriodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildBenefitPeriodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildBenefitPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
