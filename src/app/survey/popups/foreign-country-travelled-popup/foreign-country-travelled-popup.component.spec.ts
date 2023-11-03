import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForeignCountryTravelledPopupComponent } from './foreign-country-travelled-popup.component';

describe('ForeignCountryTravelledPopupComponent', () => {
  let component: ForeignCountryTravelledPopupComponent;
  let fixture: ComponentFixture<ForeignCountryTravelledPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForeignCountryTravelledPopupComponent]
    });
    fixture = TestBed.createComponent(ForeignCountryTravelledPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
