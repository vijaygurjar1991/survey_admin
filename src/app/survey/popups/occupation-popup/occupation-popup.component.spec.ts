import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationPopupComponent } from './occupation-popup.component';

describe('OccupationPopupComponent', () => {
  let component: OccupationPopupComponent;
  let fixture: ComponentFixture<OccupationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OccupationPopupComponent]
    });
    fixture = TestBed.createComponent(OccupationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
