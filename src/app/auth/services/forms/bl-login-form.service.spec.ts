import { TestBed } from '@angular/core/testing';

import { BlLoginFormService } from './bl-login-form.service';

describe('BlLoginFormService', () => {
  let service: BlLoginFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlLoginFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
