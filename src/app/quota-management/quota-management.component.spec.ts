import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotaManagementComponent } from './quota-management.component';

describe('QuotaManagementComponent', () => {
  let component: QuotaManagementComponent;
  let fixture: ComponentFixture<QuotaManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuotaManagementComponent]
    });
    fixture = TestBed.createComponent(QuotaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
