import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePopupComponent } from './store-popup.component';

describe('StorePopupComponent', () => {
  let component: StorePopupComponent;
  let fixture: ComponentFixture<StorePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorePopupComponent]
    });
    fixture = TestBed.createComponent(StorePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
