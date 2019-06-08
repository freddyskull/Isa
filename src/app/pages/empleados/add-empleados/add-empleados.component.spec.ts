import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmpleadosComponent } from './add-empleados.component';

describe('AddEmpleadosComponent', () => {
  let component: AddEmpleadosComponent;
  let fixture: ComponentFixture<AddEmpleadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEmpleadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
