import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartenersComponent } from './parteners.component';

describe('PartenersComponent', () => {
  let component: PartenersComponent;
  let fixture: ComponentFixture<PartenersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartenersComponent]
    });
    fixture = TestBed.createComponent(PartenersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
