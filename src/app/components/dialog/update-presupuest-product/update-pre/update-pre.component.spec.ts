import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePreComponent } from './update-pre.component';

describe('UpdatePreComponent', () => {
  let component: UpdatePreComponent;
  let fixture: ComponentFixture<UpdatePreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
