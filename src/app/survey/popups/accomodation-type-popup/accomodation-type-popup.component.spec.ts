import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomodationTypePopupComponent } from './accomodation-type-popup.component';

describe('AccomodationTypePopupComponent', () => {
  let component: AccomodationTypePopupComponent;
  let fixture: ComponentFixture<AccomodationTypePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccomodationTypePopupComponent]
    });
    fixture = TestBed.createComponent(AccomodationTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
