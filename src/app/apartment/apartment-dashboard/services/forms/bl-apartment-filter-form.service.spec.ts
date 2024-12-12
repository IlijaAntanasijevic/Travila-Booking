import { TestBed } from '@angular/core/testing';

import { BlApartmentFilterFormService } from './bl-apartment-filter-form.service';

describe('BlApartmentFilterFormService', () => {
  let service: BlApartmentFilterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlApartmentFilterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
