import { TestBed } from '@angular/core/testing';

import { BlHomeRequestsService } from './bl-home-requests.service';

describe('BlHomeRequestsService', () => {
  let service: BlHomeRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlHomeRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
