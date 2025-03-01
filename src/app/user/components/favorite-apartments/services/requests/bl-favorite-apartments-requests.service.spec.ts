import { TestBed } from '@angular/core/testing';

import { BlFavoriteApartmentsRequestsService } from './bl-favorite-apartments-requests.service';

describe('BlFavoriteApartmentsRequestsService', () => {
  let service: BlFavoriteApartmentsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlFavoriteApartmentsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
