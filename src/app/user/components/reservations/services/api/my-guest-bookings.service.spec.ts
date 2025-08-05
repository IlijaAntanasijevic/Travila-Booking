import { TestBed } from '@angular/core/testing';

import { MyGuestBookingsService } from './my-guest-bookings.service';

describe('MyGuestBookingsService', () => {
  let service: MyGuestBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGuestBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
