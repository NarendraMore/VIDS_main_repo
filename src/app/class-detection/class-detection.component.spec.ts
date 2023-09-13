import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassDetectionComponent } from './class-detection.component';

describe('ClassDetectionComponent', () => {
  let component: ClassDetectionComponent;
  let fixture: ComponentFixture<ClassDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassDetectionComponent]
    });
    fixture = TestBed.createComponent(ClassDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
