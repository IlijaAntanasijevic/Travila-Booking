import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserApartmentComponent } from './add-user-apartment.component';

describe('AddUserApartmentComponent', () => {
  let component: AddUserApartmentComponent;
  let fixture: ComponentFixture<AddUserApartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserApartmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserApartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
