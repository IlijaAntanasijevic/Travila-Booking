import { TestBed } from '@angular/core/testing';

import { BlOpenaiSetupRequestsService } from './bl-openai-setup-requests.service';

describe('BlOpenaiSetupRequestsService', () => {
  let service: BlOpenaiSetupRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlOpenaiSetupRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
