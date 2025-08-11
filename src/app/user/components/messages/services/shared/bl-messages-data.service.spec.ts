import { TestBed } from '@angular/core/testing';

import { BlMessagesDataService } from './bl-messages-data.service';

describe('BlMessagesDataService', () => {
  let service: BlMessagesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlMessagesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
