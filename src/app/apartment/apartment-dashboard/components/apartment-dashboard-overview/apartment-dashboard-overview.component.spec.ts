import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardOverviewComponent } from './apartment-dashboard-overview.component';

describe('ApartmentDashboardOverviewComponent', () => {
  let component: ApartmentDashboardOverviewComponent;
  let fixture: ComponentFixture<ApartmentDashboardOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardOverviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
