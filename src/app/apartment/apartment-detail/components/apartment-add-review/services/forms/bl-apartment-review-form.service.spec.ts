import { TestBed } from '@angular/core/testing';

import { BlApartmentReviewFormService } from './bl-apartment-review-form.service';

describe('BlApartmentReviewFormService', () => {
  let service: BlApartmentReviewFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlApartmentReviewFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
