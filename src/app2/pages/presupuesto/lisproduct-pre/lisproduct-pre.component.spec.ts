import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LisproductPreComponent } from './lisproduct-pre.component';

describe('LisproductPreComponent', () => {
  let component: LisproductPreComponent;
  let fixture: ComponentFixture<LisproductPreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LisproductPreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LisproductPreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
