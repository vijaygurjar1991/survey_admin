import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinCodePopupComponent } from './pin-code-popup.component';

describe('PinCodePopupComponent', () => {
  let component: PinCodePopupComponent;
  let fixture: ComponentFixture<PinCodePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PinCodePopupComponent]
    });
    fixture = TestBed.createComponent(PinCodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
