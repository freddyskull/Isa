import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HermanoComponent } from './hermano.component';

describe('HermanoComponent', () => {
  let component: HermanoComponent;
  let fixture: ComponentFixture<HermanoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HermanoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HermanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
