import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChildBenefitComponent } from './new-child-benefit.component';

describe('NewChildBenefitComponent', () => {
  let component: NewChildBenefitComponent;
  let fixture: ComponentFixture<NewChildBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewChildBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewChildBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
