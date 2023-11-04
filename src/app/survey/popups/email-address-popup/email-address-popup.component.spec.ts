import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAddressPopupComponent } from './email-address-popup.component';

describe('EmailAddressPopupComponent', () => {
  let component: EmailAddressPopupComponent;
  let fixture: ComponentFixture<EmailAddressPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailAddressPopupComponent]
    });
    fixture = TestBed.createComponent(EmailAddressPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
