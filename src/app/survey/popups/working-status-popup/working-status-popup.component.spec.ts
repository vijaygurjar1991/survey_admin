import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingStatusPopupComponent } from './working-status-popup.component';

describe('WorkingStatusPopupComponent', () => {
  let component: WorkingStatusPopupComponent;
  let fixture: ComponentFixture<WorkingStatusPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkingStatusPopupComponent]
    });
    fixture = TestBed.createComponent(WorkingStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
