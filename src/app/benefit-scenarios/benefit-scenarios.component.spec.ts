import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitScenariosComponent } from './benefit-scenarios.component';

describe('BenefitScenariosComponent', () => {
  let component: BenefitScenariosComponent;
  let fixture: ComponentFixture<BenefitScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
