import { TestBed } from '@angular/core/testing';

import { AdminUserUseCasesService } from './admin-user-use-cases.service';

describe('AdminUserUseCasesService', () => {
  let service: AdminUserUseCasesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUserUseCasesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
