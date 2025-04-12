import { TestBed } from '@angular/core/testing';

import { BlAddEditApartmetDataService } from './bl-add-edit-apartmet-data.service';

describe('BlAddEditApartmetDataService', () => {
  let service: BlAddEditApartmetDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAddEditApartmetDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
