import { TestBed } from '@angular/core/testing';

import { BlBookingRequestsService } from './bl-booking-requests.service';

describe('BlBookingRequestsService', () => {
  let service: BlBookingRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlBookingRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
