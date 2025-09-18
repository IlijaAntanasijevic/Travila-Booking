import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTravelStatsComponent } from './home-travel-stats.component';

describe('HomeTravelStatsComponent', () => {
  let component: HomeTravelStatsComponent;
  let fixture: ComponentFixture<HomeTravelStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTravelStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTravelStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
