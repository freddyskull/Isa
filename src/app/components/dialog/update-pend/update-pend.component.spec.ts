import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePendComponent } from './update-pend.component';

describe('UpdatePendComponent', () => {
  let component: UpdatePendComponent;
  let fixture: ComponentFixture<UpdatePendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
