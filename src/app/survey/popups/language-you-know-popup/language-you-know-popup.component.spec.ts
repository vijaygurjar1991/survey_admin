import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageYouKnowPopupComponent } from './language-you-know-popup.component';

describe('LanguageYouKnowPopupComponent', () => {
  let component: LanguageYouKnowPopupComponent;
  let fixture: ComponentFixture<LanguageYouKnowPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LanguageYouKnowPopupComponent]
    });
    fixture = TestBed.createComponent(LanguageYouKnowPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
