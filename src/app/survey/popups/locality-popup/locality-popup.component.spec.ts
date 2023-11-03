import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityPopupComponent } from './locality-popup.component';

describe('LocalityPopupComponent', () => {
  let component: LocalityPopupComponent;
  let fixture: ComponentFixture<LocalityPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalityPopupComponent]
    });
    fixture = TestBed.createComponent(LocalityPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
