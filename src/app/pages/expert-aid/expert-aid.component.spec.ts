import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAidComponent } from './expert-aid.component';

describe('ExpertAidComponent', () => {
  let component: ExpertAidComponent;
  let fixture: ComponentFixture<ExpertAidComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertAidComponent]
    });
    fixture = TestBed.createComponent(ExpertAidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
