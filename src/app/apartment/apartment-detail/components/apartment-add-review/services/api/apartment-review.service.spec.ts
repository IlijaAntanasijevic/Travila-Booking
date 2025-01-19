import { TestBed } from '@angular/core/testing';

import { ApartmentReviewService } from './apartment-review.service';

describe('ApartmentReviewService', () => {
  let service: ApartmentReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
