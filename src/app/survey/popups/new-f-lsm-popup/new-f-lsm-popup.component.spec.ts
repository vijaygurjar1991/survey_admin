import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFLsmPopupComponent } from './new-f-lsm-popup.component';

describe('NewFLsmPopupComponent', () => {
  let component: NewFLsmPopupComponent;
  let fixture: ComponentFixture<NewFLsmPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewFLsmPopupComponent]
    });
    fixture = TestBed.createComponent(NewFLsmPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
