import { TestBed } from '@angular/core/testing';

import { BlBookingsRequestsService } from './bl-bookings-requests.service';

describe('BlBookingsRequestsService', () => {
  let service: BlBookingsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlBookingsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
