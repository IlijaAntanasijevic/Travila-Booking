import { TestBed } from '@angular/core/testing';

import { ApartmentImageService } from './apartment-image.service';

describe('ApartmentImageService', () => {
  let service: ApartmentImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
