import { TestBed } from '@angular/core/testing';

import { PrepareChatService } from './prepare-chat.service';

describe('PrepareChatService', () => {
  let service: PrepareChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrepareChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
