import { TestBed } from '@angular/core/testing';

import { BlAiRequestsService } from './bl-ai-requests.service';

describe('BlAiRequestsService', () => {
  let service: BlAiRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlAiRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
