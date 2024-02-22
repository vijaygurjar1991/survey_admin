import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileIdPopupComponent } from './profile-id-popup.component';

describe('ProfileIdPopupComponent', () => {
  let component: ProfileIdPopupComponent;
  let fixture: ComponentFixture<ProfileIdPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileIdPopupComponent]
    });
    fixture = TestBed.createComponent(ProfileIdPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
