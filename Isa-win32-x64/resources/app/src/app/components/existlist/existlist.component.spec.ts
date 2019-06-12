import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistlistComponent } from './existlist.component';

describe('ExistlistComponent', () => {
  let component: ExistlistComponent;
  let fixture: ComponentFixture<ExistlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
