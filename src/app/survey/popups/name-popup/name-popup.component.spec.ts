import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NamePopupComponent } from './name-popup.component';

describe('NamePopupComponent', () => {
  let component: NamePopupComponent;
  let fixture: ComponentFixture<NamePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NamePopupComponent]
    });
    fixture = TestBed.createComponent(NamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
