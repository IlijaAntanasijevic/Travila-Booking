import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardFilterComponent } from './apartment-dashboard-filter.component';

describe('ApartmentDashboardFilterComponent', () => {
  let component: ApartmentDashboardFilterComponent;
  let fixture: ComponentFixture<ApartmentDashboardFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
