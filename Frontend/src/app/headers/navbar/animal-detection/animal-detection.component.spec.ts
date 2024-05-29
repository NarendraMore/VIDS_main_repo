import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDetectionComponent } from './animal-detection.component';

describe('AnimalDetectionComponent', () => {
  let component: AnimalDetectionComponent;
  let fixture: ComponentFixture<AnimalDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnimalDetectionComponent]
    });
    fixture = TestBed.createComponent(AnimalDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
