import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesManagerComponent } from './categories-manager.component';

describe('CategoriesManagerComponent', () => {
  let component: CategoriesManagerComponent;
  let fixture: ComponentFixture<CategoriesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
