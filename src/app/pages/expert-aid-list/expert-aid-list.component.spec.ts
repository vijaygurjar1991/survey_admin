import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAidListComponent } from './expert-aid-list.component';

describe('ExpertAidListComponent', () => {
  let component: ExpertAidListComponent;
  let fixture: ComponentFixture<ExpertAidListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertAidListComponent]
    });
    fixture = TestBed.createComponent(ExpertAidListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
