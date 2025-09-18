import { TestBed } from '@angular/core/testing';

import { HomeStatsService } from './home-stats.service';

describe('HomeStatsService', () => {
  let service: HomeStatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeStatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
