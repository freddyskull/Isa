import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaDEntregaComponent } from './nota-d-entrega.component';

describe('NotaDEntregaComponent', () => {
  let component: NotaDEntregaComponent;
  let fixture: ComponentFixture<NotaDEntregaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotaDEntregaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotaDEntregaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
