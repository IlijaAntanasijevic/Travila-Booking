import { TestBed } from '@angular/core/testing';

import { BlRegisterRequestsService } from './bl-register-requests.service';

describe('BlRegisterRequestsService', () => {
  let service: BlRegisterRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlRegisterRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
