import { TestBed } from '@angular/core/testing';

import { CityCountryService } from './city-country.service';

describe('CityCountryService', () => {
  let service: CityCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CityCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
