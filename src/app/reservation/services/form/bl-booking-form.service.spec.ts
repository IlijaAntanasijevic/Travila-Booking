import { TestBed } from '@angular/core/testing';

import { BlBookingFormService } from './bl-booking-form.service';

describe('BlBookingFormService', () => {
  let service: BlBookingFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlBookingFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
