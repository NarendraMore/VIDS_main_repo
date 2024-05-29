import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlligalParkingComponent } from './illigal-parking.component';

describe('IlligalParkingComponent', () => {
  let component: IlligalParkingComponent;
  let fixture: ComponentFixture<IlligalParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IlligalParkingComponent]
    });
    fixture = TestBed.createComponent(IlligalParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
