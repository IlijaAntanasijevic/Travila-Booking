import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteApartmentsComponent } from './favorite-apartments.component';

describe('FavoriteApartmentsComponent', () => {
  let component: FavoriteApartmentsComponent;
  let fixture: ComponentFixture<FavoriteApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteApartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
