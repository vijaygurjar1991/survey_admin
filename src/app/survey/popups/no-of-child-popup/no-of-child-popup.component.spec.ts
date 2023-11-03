import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoOfChildPopupComponent } from './no-of-child-popup.component';

describe('NoOfChildPopupComponent', () => {
  let component: NoOfChildPopupComponent;
  let fixture: ComponentFixture<NoOfChildPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NoOfChildPopupComponent]
    });
    fixture = TestBed.createComponent(NoOfChildPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
