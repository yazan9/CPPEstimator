import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsGridComponent } from './benefits-grid.component';

describe('BenefitsGridComponent', () => {
  let component: BenefitsGridComponent;
  let fixture: ComponentFixture<BenefitsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
