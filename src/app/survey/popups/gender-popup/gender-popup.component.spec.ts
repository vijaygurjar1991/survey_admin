import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderPopupComponent } from './gender-popup.component';

describe('GenderPopupComponent', () => {
  let component: GenderPopupComponent;
  let fixture: ComponentFixture<GenderPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenderPopupComponent]
    });
    fixture = TestBed.createComponent(GenderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
