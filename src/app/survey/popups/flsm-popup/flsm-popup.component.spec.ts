import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlsmPopupComponent } from './flsm-popup.component';

describe('FlsmPopupComponent', () => {
  let component: FlsmPopupComponent;
  let fixture: ComponentFixture<FlsmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlsmPopupComponent]
    });
    fixture = TestBed.createComponent(FlsmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
