import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenciasComponent } from './existencias.component';

describe('ExistenciasComponent', () => {
  let component: ExistenciasComponent;
  let fixture: ComponentFixture<ExistenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
