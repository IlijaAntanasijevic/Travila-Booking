import { TestBed } from '@angular/core/testing';

import { ApartmentTypesService } from './apartment-types.service';

describe('ApartmentTypesService', () => {
  let service: ApartmentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
