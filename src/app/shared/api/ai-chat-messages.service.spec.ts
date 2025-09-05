import { TestBed } from '@angular/core/testing';

import { AiChatMessagesService } from './ai-chat-messages.service';

describe('AiChatMessagesService', () => {
  let service: AiChatMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiChatMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
