import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldFLsmPopupComponent } from './old-f-lsm-popup.component';

describe('OldFLsmPopupComponent', () => {
  let component: OldFLsmPopupComponent;
  let fixture: ComponentFixture<OldFLsmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OldFLsmPopupComponent]
    });
    fixture = TestBed.createComponent(OldFLsmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
