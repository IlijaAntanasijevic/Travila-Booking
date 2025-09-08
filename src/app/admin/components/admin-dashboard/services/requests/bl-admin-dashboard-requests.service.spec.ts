import { TestBed } from '@angular/core/testing';

import { BlAdminDashboardRequestsService } from './bl-admin-dashboard-requests.service';

describe('BlAdminDashboardRequestsService', () => {
  let service: BlAdminDashboardRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAdminDashboardRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
