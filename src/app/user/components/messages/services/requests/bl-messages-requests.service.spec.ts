import { TestBed } from '@angular/core/testing';

import { BlMessagesRequestsService } from './bl-messages-requests.service';

describe('BlMessagesRequestsService', () => {
  let service: BlMessagesRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlMessagesRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
