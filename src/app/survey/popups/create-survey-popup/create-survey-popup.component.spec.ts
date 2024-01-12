import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSurveyPopupComponent } from './create-survey-popup.component';

describe('CreatSurveyPopupComponent', () => {
  let component: CreateSurveyPopupComponent;
  let fixture: ComponentFixture<CreateSurveyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSurveyPopupComponent]
    });
    fixture = TestBed.createComponent(CreateSurveyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
