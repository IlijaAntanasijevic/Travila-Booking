import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseDetailsDialogComponent } from './use-case-details-dialog.component';

describe('UseCaseDetailsDialogComponent', () => {
  let component: UseCaseDetailsDialogComponent;
  let fixture: ComponentFixture<UseCaseDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UseCaseDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseCaseDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
