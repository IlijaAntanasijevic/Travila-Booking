import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationInfoDialogComponent } from './reservation-info-dialog.component';

describe('ReservationInfoDialogComponent', () => {
  let component: ReservationInfoDialogComponent;
  let fixture: ComponentFixture<ReservationInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservationInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
