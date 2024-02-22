import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertAidAllServicesComponent } from './expert-aid-all-services.component';

describe('ExpertAidAllServicesComponent', () => {
  let component: ExpertAidAllServicesComponent;
  let fixture: ComponentFixture<ExpertAidAllServicesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertAidAllServicesComponent]
    });
    fixture = TestBed.createComponent(ExpertAidAllServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
