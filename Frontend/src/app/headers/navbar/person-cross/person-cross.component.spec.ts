import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonCrossComponent } from './person-cross.component';

describe('PersonCrossComponent', () => {
  let component: PersonCrossComponent;
  let fixture: ComponentFixture<PersonCrossComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonCrossComponent]
    });
    fixture = TestBed.createComponent(PersonCrossComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
