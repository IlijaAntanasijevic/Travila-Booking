import { TestBed } from '@angular/core/testing';

import { BlHomeFeaturedApartmentsRequestsService } from './bl-home-featured-apartments-requests.service';

describe('BlHomeFeaturedApartmentsRequestsService', () => {
  let service: BlHomeFeaturedApartmentsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlHomeFeaturedApartmentsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
