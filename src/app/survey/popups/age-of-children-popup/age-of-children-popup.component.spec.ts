import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeOfChildrenPopupComponent } from './age-of-children-popup.component';

describe('AgeOfChildrenPopupComponent', () => {
  let component: AgeOfChildrenPopupComponent;
  let fixture: ComponentFixture<AgeOfChildrenPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgeOfChildrenPopupComponent]
    });
    fixture = TestBed.createComponent(AgeOfChildrenPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
