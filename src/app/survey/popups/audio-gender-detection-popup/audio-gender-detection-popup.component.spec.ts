import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioGenderDetectionPopupComponent } from './audio-gender-detection-popup.component';

describe('AudioGenderDetectionPopupComponent', () => {
  let component: AudioGenderDetectionPopupComponent;
  let fixture: ComponentFixture<AudioGenderDetectionPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AudioGenderDetectionPopupComponent]
    });
    fixture = TestBed.createComponent(AudioGenderDetectionPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
