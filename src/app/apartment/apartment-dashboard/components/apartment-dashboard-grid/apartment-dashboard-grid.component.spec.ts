import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardGridComponent } from './apartment-dashboard-grid.component';

describe('ApartmentDashboardGridComponent', () => {
  let component: ApartmentDashboardGridComponent;
  let fixture: ComponentFixture<ApartmentDashboardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
