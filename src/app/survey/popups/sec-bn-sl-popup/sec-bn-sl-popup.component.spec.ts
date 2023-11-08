import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecBnSlPopupComponent } from './sec-bn-sl-popup.component';

describe('SecBnSlPopupComponent', () => {
  let component: SecBnSlPopupComponent;
  let fixture: ComponentFixture<SecBnSlPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecBnSlPopupComponent]
    });
    fixture = TestBed.createComponent(SecBnSlPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
