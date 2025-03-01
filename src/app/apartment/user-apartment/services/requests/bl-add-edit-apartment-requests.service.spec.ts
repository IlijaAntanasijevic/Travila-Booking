import { TestBed } from '@angular/core/testing';

import { BlAddEditApartmentRequestsService } from './bl-add-edit-apartment-requests.service';

describe('BlAddEditApartmentRequestsService', () => {
  let service: BlAddEditApartmentRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAddEditApartmentRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
