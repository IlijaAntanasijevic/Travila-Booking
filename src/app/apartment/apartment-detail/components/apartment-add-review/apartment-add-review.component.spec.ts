import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentAddReviewComponent } from './apartment-add-review.component';

describe('ApartmentAddReviewComponent', () => {
  let component: ApartmentAddReviewComponent;
  let fixture: ComponentFixture<ApartmentAddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentAddReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
