import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAccessoriesPopupComponent } from './home-accessories-popup.component';

describe('HomeAccessoriesPopupComponent', () => {
  let component: HomeAccessoriesPopupComponent;
  let fixture: ComponentFixture<HomeAccessoriesPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAccessoriesPopupComponent]
    });
    fixture = TestBed.createComponent(HomeAccessoriesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
