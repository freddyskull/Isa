import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Navigate2Component } from './navigate2.component';

describe('Navigate2Component', () => {
  let component: Navigate2Component;
  let fixture: ComponentFixture<Navigate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Navigate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Navigate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
