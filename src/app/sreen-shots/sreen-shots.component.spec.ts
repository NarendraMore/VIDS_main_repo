import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SreenShotsComponent } from './sreen-shots.component';

describe('SreenShotsComponent', () => {
  let component: SreenShotsComponent;
  let fixture: ComponentFixture<SreenShotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SreenShotsComponent]
    });
    fixture = TestBed.createComponent(SreenShotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
