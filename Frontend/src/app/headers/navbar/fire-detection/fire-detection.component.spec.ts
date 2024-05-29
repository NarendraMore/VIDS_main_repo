import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireDetectionComponent } from './fire-detection.component';

describe('FireDetectionComponent', () => {
  let component: FireDetectionComponent;
  let fixture: ComponentFixture<FireDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FireDetectionComponent]
    });
    fixture = TestBed.createComponent(FireDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
