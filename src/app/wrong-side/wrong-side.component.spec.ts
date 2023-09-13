import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrongSideComponent } from './wrong-side.component';

describe('WrongSideComponent', () => {
  let component: WrongSideComponent;
  let fixture: ComponentFixture<WrongSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WrongSideComponent]
    });
    fixture = TestBed.createComponent(WrongSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
