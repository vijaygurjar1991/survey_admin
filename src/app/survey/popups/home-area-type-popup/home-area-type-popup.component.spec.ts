import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAreaTypePopupComponent } from './home-area-type-popup.component';

describe('HomeAreaTypePopupComponent', () => {
  let component: HomeAreaTypePopupComponent;
  let fixture: ComponentFixture<HomeAreaTypePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAreaTypePopupComponent]
    });
    fixture = TestBed.createComponent(HomeAreaTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
