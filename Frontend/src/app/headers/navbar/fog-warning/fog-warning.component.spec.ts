import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FogWarningComponent } from './fog-warning.component';

describe('FogWarningComponent', () => {
  let component: FogWarningComponent;
  let fixture: ComponentFixture<FogWarningComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FogWarningComponent]
    });
    fixture = TestBed.createComponent(FogWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
