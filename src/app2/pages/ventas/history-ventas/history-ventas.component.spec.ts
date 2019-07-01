import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVentasComponent } from './history-ventas.component';

describe('HistoryVentasComponent', () => {
  let component: HistoryVentasComponent;
  let fixture: ComponentFixture<HistoryVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
