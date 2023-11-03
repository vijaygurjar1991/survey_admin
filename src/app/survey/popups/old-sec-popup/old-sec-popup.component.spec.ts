import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldSecPopupComponent } from './old-sec-popup.component';

describe('OldSecPopupComponent', () => {
  let component: OldSecPopupComponent;
  let fixture: ComponentFixture<OldSecPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldSecPopupComponent]
    });
    fixture = TestBed.createComponent(OldSecPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
