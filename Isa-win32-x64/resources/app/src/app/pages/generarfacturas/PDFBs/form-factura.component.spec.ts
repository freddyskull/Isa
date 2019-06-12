import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFacturaComponent } from './form-factura.component';

describe('FormFacturaComponent', () => {
  let component: FormFacturaComponent;
  let fixture: ComponentFixture<FormFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
