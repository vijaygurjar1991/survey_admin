import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsCountPopupComponent } from './kids-count-popup.component';

describe('KidsCountPopupComponent', () => {
  let component: KidsCountPopupComponent;
  let fixture: ComponentFixture<KidsCountPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KidsCountPopupComponent]
    });
    fixture = TestBed.createComponent(KidsCountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
