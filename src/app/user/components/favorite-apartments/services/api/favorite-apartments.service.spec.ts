import { TestBed } from '@angular/core/testing';

import { FavoriteApartmentsService } from './favorite-apartments.service';

describe('FavoriteApartmentsService', () => {
  let service: FavoriteApartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteApartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
