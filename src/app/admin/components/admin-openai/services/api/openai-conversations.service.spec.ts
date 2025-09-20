import { TestBed } from '@angular/core/testing';

import { OpenaiConversationsService } from './openai-conversations.service';

describe('OpenaiConversationsService', () => {
  let service: OpenaiConversationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenaiConversationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
