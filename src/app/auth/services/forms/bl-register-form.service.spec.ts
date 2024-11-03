import { TestBed } from '@angular/core/testing';

import { BlRegisterFormService } from './bl-register-form.service';

describe('BlRegisterFormService', () => {
  let service: BlRegisterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlRegisterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
