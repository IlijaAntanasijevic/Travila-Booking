import { TestBed } from '@angular/core/testing';

import { AdminApartmentsService } from './admin-apartments.service';

describe('AdminApartmentsService', () => {
  let service: AdminApartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminApartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
