import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserArchivedApartmentsComponent } from './user-archived-apartments.component';

describe('UserArchivedApartmentsComponent', () => {
  let component: UserArchivedApartmentsComponent;
  let fixture: ComponentFixture<UserArchivedApartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserArchivedApartmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserArchivedApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
