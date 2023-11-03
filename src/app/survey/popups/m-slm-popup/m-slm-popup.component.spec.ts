import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MSlmPopupComponent } from './m-slm-popup.component';

describe('MSlmPopupComponent', () => {
  let component: MSlmPopupComponent;
  let fixture: ComponentFixture<MSlmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MSlmPopupComponent]
    });
    fixture = TestBed.createComponent(MSlmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
