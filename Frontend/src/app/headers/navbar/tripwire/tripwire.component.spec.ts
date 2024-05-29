import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripwireComponent } from './tripwire.component';

describe('TripwireComponent', () => {
  let component: TripwireComponent;
  let fixture: ComponentFixture<TripwireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TripwireComponent]
    });
    fixture = TestBed.createComponent(TripwireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
