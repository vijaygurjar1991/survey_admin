import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyIncomePopupComponent } from './monthly-income-popup.component';

describe('MonthlyIncomePopupComponent', () => {
  let component: MonthlyIncomePopupComponent;
  let fixture: ComponentFixture<MonthlyIncomePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyIncomePopupComponent]
    });
    fixture = TestBed.createComponent(MonthlyIncomePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
