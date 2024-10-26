import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFlightsComponent } from './home-flights.component';

describe('HomeFlightsComponent', () => {
  let component: HomeFlightsComponent;
  let fixture: ComponentFixture<HomeFlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeFlightsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
