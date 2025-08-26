import { TestBed } from '@angular/core/testing';

import { BlForgotPasswordService } from './bl-forgot-password.service';

describe('BlForgotPasswordService', () => {
  let service: BlForgotPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlForgotPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
