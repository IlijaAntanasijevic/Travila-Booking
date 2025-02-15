import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApartmentDashboardComponent } from './user-apartment-dashboard.component';

describe('UserApartmentDashboardComponent', () => {
  let component: UserApartmentDashboardComponent;
  let fixture: ComponentFixture<UserApartmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserApartmentDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserApartmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
