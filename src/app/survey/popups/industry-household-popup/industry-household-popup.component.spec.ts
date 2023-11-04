import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryHouseholdPopupComponent } from './industry-household-popup.component';

describe('IndustryHouseholdPopupComponent', () => {
  let component: IndustryHouseholdPopupComponent;
  let fixture: ComponentFixture<IndustryHouseholdPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryHouseholdPopupComponent]
    });
    fixture = TestBed.createComponent(IndustryHouseholdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
