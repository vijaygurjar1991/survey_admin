import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatSurveyPopupComponent } from './create-survey-popup.component';

describe('CreatSurveyPopupComponent', () => {
  let component: CreatSurveyPopupComponent;
  let fixture: ComponentFixture<CreatSurveyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatSurveyPopupComponent]
    });
    fixture = TestBed.createComponent(CreatSurveyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
