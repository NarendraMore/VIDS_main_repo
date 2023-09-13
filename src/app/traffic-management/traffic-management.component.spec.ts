import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficManagementComponent } from './traffic-management.component';

describe('TrafficManagementComponent', () => {
  let component: TrafficManagementComponent;
  let fixture: ComponentFixture<TrafficManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrafficManagementComponent]
    });
    fixture = TestBed.createComponent(TrafficManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
