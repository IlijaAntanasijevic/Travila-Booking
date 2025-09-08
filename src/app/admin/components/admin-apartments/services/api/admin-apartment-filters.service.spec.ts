import { TestBed } from '@angular/core/testing';

import { AdminApartmentFiltersService } from './admin-apartment-filters.service';

describe('AdminApartmentFiltersService', () => {
  let service: AdminApartmentFiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApartmentFiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
