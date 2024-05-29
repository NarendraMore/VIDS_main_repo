import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeedDropComponent } from './speed-drop.component';

describe('SpeedDropComponent', () => {
  let component: SpeedDropComponent;
  let fixture: ComponentFixture<SpeedDropComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpeedDropComponent]
    });
    fixture = TestBed.createComponent(SpeedDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
