import { TestBed } from '@angular/core/testing';

import { BlApartmentsRequestsService } from './bl-apartments-requests.service';

describe('BlApartmentsRequestsService', () => {
  let service: BlApartmentsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlApartmentsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
