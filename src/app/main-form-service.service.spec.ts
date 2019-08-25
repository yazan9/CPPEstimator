import { TestBed } from '@angular/core/testing';

import { MainFormServiceService } from './main-form-service.service';

describe('MainFormServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainFormServiceService = TestBed.get(MainFormServiceService);
    expect(service).toBeTruthy();
  });
});
