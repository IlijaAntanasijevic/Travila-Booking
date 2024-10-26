import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSeachComponent } from './home-seach.component';

describe('HomeSeachComponent', () => {
  let component: HomeSeachComponent;
  let fixture: ComponentFixture<HomeSeachComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSeachComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeSeachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
