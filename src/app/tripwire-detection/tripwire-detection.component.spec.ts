import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripwireDetectionComponent } from './tripwire-detection.component';

describe('TripwireDetectionComponent', () => {
  let component: TripwireDetectionComponent;
  let fixture: ComponentFixture<TripwireDetectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripwireDetectionComponent]
    });
    fixture = TestBed.createComponent(TripwireDetectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
