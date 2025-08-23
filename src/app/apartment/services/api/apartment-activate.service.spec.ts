import { TestBed } from '@angular/core/testing';

import { ApartmentActivateService } from './apartment-activate.service';

describe('ApartmentActivateService', () => {
  let service: ApartmentActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
