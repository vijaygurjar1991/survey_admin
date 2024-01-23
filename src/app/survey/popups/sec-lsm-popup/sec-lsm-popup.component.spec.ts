import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecLsmPopupComponent } from './sec-lsm-popup.component';

describe('SecLsmPopupComponent', () => {
  let component: SecLsmPopupComponent;
  let fixture: ComponentFixture<SecLsmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecLsmPopupComponent]
    });
    fixture = TestBed.createComponent(SecLsmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
