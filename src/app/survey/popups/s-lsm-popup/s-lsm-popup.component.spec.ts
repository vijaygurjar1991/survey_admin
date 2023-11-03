import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SLsmPopupComponent } from './s-lsm-popup.component';

describe('SLsmPopupComponent', () => {
  let component: SLsmPopupComponent;
  let fixture: ComponentFixture<SLsmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SLsmPopupComponent]
    });
    fixture = TestBed.createComponent(SLsmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
