import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileByIdComponent } from './profile-by-id.component';

describe('ProfileByIdComponent', () => {
  let component: ProfileByIdComponent;
  let fixture: ComponentFixture<ProfileByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileByIdComponent]
    });
    fixture = TestBed.createComponent(ProfileByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
