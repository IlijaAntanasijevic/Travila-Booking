import { TestBed } from '@angular/core/testing';

import { BlAdminUsersRequestsService } from './bl-admin-users-requests.service';

describe('BlAdminUsersRequestsService', () => {
  let service: BlAdminUsersRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAdminUsersRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
