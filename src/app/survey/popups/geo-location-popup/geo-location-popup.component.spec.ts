import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoLocationPopupComponent } from './geo-location-popup.component';

describe('GeoLocationPopupComponent', () => {
  let component: GeoLocationPopupComponent;
  let fixture: ComponentFixture<GeoLocationPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeoLocationPopupComponent]
    });
    fixture = TestBed.createComponent(GeoLocationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
