import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraTemperingComponent } from './camera-tempering.component';

describe('CameraTemperingComponent', () => {
  let component: CameraTemperingComponent;
  let fixture: ComponentFixture<CameraTemperingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CameraTemperingComponent]
    });
    fixture = TestBed.createComponent(CameraTemperingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
