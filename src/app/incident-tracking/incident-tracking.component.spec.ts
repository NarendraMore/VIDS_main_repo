import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentTrackingComponent } from './incident-tracking.component';

describe('IncidentTrackingComponent', () => {
  let component: IncidentTrackingComponent;
  let fixture: ComponentFixture<IncidentTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IncidentTrackingComponent]
    });
    fixture = TestBed.createComponent(IncidentTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
