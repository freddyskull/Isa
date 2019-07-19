import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmFacNotaComponent } from './confirm-fac-nota.component';

describe('ConfirmFacNotaComponent', () => {
  let component: ConfirmFacNotaComponent;
  let fixture: ComponentFixture<ConfirmFacNotaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmFacNotaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmFacNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
