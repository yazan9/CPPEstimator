import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthDatePickerInlineComponent } from './month-date-picker-inline.component';

describe('MonthDatePickerInlineComponent', () => {
  let component: MonthDatePickerInlineComponent;
  let fixture: ComponentFixture<MonthDatePickerInlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthDatePickerInlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthDatePickerInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
