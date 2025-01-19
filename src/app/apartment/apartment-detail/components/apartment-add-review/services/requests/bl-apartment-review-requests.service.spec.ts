import { TestBed } from '@angular/core/testing';

import { BlApartmentReviewRequestsService } from './bl-apartment-review-requests.service';

describe('BlApartmentReviewRequestsService', () => {
  let service: BlApartmentReviewRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlApartmentReviewRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
