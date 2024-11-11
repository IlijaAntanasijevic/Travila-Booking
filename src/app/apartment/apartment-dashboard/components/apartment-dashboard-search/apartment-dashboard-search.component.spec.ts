import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardSearchComponent } from './apartment-dashboard-search.component';

describe('ApartmentDashboardSearchComponent', () => {
  let component: ApartmentDashboardSearchComponent;
  let fixture: ComponentFixture<ApartmentDashboardSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
