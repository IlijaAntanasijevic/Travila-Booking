import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOverviewDialogComponent } from './user-overview-dialog.component';

describe('UserOverviewDialogComponent', () => {
  let component: UserOverviewDialogComponent;
  let fixture: ComponentFixture<UserOverviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserOverviewDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
