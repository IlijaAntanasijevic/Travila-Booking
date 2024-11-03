import { TestBed } from '@angular/core/testing';

import { BlLoginRequestsService } from './bl-login-requests.service';

describe('BlLoginRequestsService', () => {
  let service: BlLoginRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlLoginRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
