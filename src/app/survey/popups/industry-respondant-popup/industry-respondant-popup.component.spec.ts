import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryRespondantPopupComponent } from './industry-respondant-popup.component';

describe('IndustryRespondantPopupComponent', () => {
  let component: IndustryRespondantPopupComponent;
  let fixture: ComponentFixture<IndustryRespondantPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryRespondantPopupComponent]
    });
    fixture = TestBed.createComponent(IndustryRespondantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
