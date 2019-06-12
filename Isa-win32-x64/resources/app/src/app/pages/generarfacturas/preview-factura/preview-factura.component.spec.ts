import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewFacturaComponent } from './preview-factura.component';

describe('PreviewFacturaComponent', () => {
  let component: PreviewFacturaComponent;
  let fixture: ComponentFixture<PreviewFacturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewFacturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
