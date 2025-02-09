import { TestBed } from '@angular/core/testing';

import { BlUserProfileFormService } from './bl-user-profile-form.service';

describe('BlUserProfileFormService', () => {
  let service: BlUserProfileFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlUserProfileFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
