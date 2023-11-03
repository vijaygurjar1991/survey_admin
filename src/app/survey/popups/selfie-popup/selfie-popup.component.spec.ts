import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfiePopupComponent } from './selfie-popup.component';

describe('SelfiePopupComponent', () => {
  let component: SelfiePopupComponent;
  let fixture: ComponentFixture<SelfiePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelfiePopupComponent]
    });
    fixture = TestBed.createComponent(SelfiePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
