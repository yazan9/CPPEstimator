import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityPeriodsComponent } from './disability-periods.component';

describe('DisabilityPeriodsComponent', () => {
  let component: DisabilityPeriodsComponent;
  let fixture: ComponentFixture<DisabilityPeriodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityPeriodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityPeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
