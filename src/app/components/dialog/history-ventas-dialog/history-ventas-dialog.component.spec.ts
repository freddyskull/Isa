import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryVentasDialogComponent } from './history-ventas-dialog.component';

describe('HistoryVentasDialogComponent', () => {
  let component: HistoryVentasDialogComponent;
  let fixture: ComponentFixture<HistoryVentasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryVentasDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryVentasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
