import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NccsPopupComponent } from './nccs-popup.component';

describe('NccsPopupComponent', () => {
  let component: NccsPopupComponent;
  let fixture: ComponentFixture<NccsPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NccsPopupComponent]
    });
    fixture = TestBed.createComponent(NccsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
