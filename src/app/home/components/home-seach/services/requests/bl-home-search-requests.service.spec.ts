import { TestBed } from '@angular/core/testing';

import { BlHomeSearchRequestsService } from './bl-home-search-requests.service';

describe('BlHomeSearchRequestsService', () => {
  let service: BlHomeSearchRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlHomeSearchRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
