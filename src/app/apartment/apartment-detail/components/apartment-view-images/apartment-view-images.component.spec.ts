import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentViewImagesComponent } from './apartment-view-images.component';

describe('ApartmentViewImagesComponent', () => {
  let component: ApartmentViewImagesComponent;
  let fixture: ComponentFixture<ApartmentViewImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApartmentViewImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartmentViewImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
