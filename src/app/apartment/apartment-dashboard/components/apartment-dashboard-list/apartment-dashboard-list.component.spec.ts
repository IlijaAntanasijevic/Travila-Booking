import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDashboardListComponent } from './apartment-dashboard-list.component';

describe('ApartmentDashboardListComponent', () => {
  let component: ApartmentDashboardListComponent;
  let fixture: ComponentFixture<ApartmentDashboardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDashboardListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentDashboardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
