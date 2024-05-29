import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongSideVehicleComponent } from './wrong-side-vehicle.component';

describe('WrongSideVehicleComponent', () => {
  let component: WrongSideVehicleComponent;
  let fixture: ComponentFixture<WrongSideVehicleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongSideVehicleComponent]
    });
    fixture = TestBed.createComponent(WrongSideVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
