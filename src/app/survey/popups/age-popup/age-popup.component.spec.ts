import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgePopupComponent } from './age-popup.component';

describe('AgePopupComponent', () => {
  let component: AgePopupComponent;
  let fixture: ComponentFixture<AgePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgePopupComponent]
    });
    fixture = TestBed.createComponent(AgePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
