import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendarSurveyListComponent } from './vendar-survey-list.component';

describe('VendarSurveyListComponent', () => {
  let component: VendarSurveyListComponent;
  let fixture: ComponentFixture<VendarSurveyListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendarSurveyListComponent]
    });
    fixture = TestBed.createComponent(VendarSurveyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
