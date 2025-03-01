import { TestBed } from '@angular/core/testing';

import { BlAddEditApartmentFormService } from './bl-add-edit-apartment-form.service';

describe('BlAddEditApartmentFormService', () => {
  let service: BlAddEditApartmentFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAddEditApartmentFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
