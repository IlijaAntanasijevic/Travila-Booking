import { TestBed } from '@angular/core/testing';

import { BlApartmentDashboardDataService } from './bl-apartment-dashboard-data.service';

describe('BlApartmentDashboardDataService', () => {
  let service: BlApartmentDashboardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlApartmentDashboardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
