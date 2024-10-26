import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedApartmentsComponent } from './home-featured-apartments.component';

describe('HomeFeaturedApartmentsComponent', () => {
  let component: HomeFeaturedApartmentsComponent;
  let fixture: ComponentFixture<HomeFeaturedApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeFeaturedApartmentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeFeaturedApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
