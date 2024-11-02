import { TestBed } from '@angular/core/testing';

import { BlHomeSearchFormService } from './bl-home-search-form.service';

describe('BlHomeSearchFormService', () => {
  let service: BlHomeSearchFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlHomeSearchFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
