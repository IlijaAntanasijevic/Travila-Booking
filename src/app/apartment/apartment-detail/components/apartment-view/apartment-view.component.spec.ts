import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentViewComponent } from './apartment-view.component';

describe('ApartmentViewComponent', () => {
  let component: ApartmentViewComponent;
  let fixture: ComponentFixture<ApartmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
