import { TestBed } from '@angular/core/testing';

import { BlAdminSettingsRequestsService } from './bl-admin-settings-requests.service';

describe('BlAdminSettingsRequestsService', () => {
  let service: BlAdminSettingsRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAdminSettingsRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
