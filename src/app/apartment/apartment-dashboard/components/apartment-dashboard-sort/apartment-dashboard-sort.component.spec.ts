import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardSortComponent } from './apartment-dashboard-sort.component';

describe('ApartmentDashboardSortComponent', () => {
  let component: ApartmentDashboardSortComponent;
  let fixture: ComponentFixture<ApartmentDashboardSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardSortComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
