import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProveedoresComponent } from './agregar-proveedores.component';

describe('AgregarProveedoresComponent', () => {
  let component: AgregarProveedoresComponent;
  let fixture: ComponentFixture<AgregarProveedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregarProveedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarProveedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
