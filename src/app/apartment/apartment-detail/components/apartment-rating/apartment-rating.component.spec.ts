import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentRatingComponent } from './apartment-rating.component';

describe('ApartmentRatingComponent', () => {
  let component: ApartmentRatingComponent;
  let fixture: ComponentFixture<ApartmentRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentRatingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApartmentRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
