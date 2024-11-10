import { TestBed } from '@angular/core/testing';

import { BlUserRequestsService } from './bl-user-requests.service';

describe('BlUserRequestsService', () => {
  let service: BlUserRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlUserRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
