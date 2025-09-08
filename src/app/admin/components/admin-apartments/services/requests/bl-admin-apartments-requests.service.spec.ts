import { TestBed } from '@angular/core/testing';

import { BlAdminApartmentsRequestsService } from './bl-admin-apartments-requests.service';

describe('BlAdminApartmentsRequestsService', () => {
  let service: BlAdminApartmentsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAdminApartmentsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
