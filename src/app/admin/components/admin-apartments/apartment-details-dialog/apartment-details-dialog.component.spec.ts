import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDetailsDialogComponent } from './apartment-details-dialog.component';

describe('ApartmentDetailsDialogComponent', () => {
  let component: ApartmentDetailsDialogComponent;
  let fixture: ComponentFixture<ApartmentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
