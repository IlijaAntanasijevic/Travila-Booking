import { TestBed } from '@angular/core/testing';

import { OpenaiSetupService } from './openai-setup.service';

describe('OpenaiSetupService', () => {
  let service: OpenaiSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
