import { TestBed } from '@angular/core/testing';

import { HomeTestimonialsService } from './home-testimonials.service';

describe('HomeTestimonialsService', () => {
  let service: HomeTestimonialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeTestimonialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
