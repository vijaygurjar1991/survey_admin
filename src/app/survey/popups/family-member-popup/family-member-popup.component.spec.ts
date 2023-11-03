import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberPopupComponent } from './family-member-popup.component';

describe('FamilyMemberPopupComponent', () => {
  let component: FamilyMemberPopupComponent;
  let fixture: ComponentFixture<FamilyMemberPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FamilyMemberPopupComponent]
    });
    fixture = TestBed.createComponent(FamilyMemberPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
