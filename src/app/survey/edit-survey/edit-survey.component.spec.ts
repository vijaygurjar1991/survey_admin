import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurveyComponent } from './edit-survey.component';

describe('EditSurveyComponent', () => {
  let component: EditSurveyComponent;
  let fixture: ComponentFixture<EditSurveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSurveyComponent]
    });
    fixture = TestBed.createComponent(EditSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
