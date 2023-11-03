import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaritalStatusNewPopupComponent } from './marital-status-new-popup.component';

describe('MaritalStatusNewPopupComponent', () => {
  let component: MaritalStatusNewPopupComponent;
  let fixture: ComponentFixture<MaritalStatusNewPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaritalStatusNewPopupComponent]
    });
    fixture = TestBed.createComponent(MaritalStatusNewPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
