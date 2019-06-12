import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasPendComponent } from './ventas-pend.component';

describe('VentasPendComponent', () => {
  let component: VentasPendComponent;
  let fixture: ComponentFixture<VentasPendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentasPendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasPendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
