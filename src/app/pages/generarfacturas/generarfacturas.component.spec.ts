import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarfacturasComponent } from './generarfacturas.component';

describe('GenerarfacturasComponent', () => {
  let component: GenerarfacturasComponent;
  let fixture: ComponentFixture<GenerarfacturasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerarfacturasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarfacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
