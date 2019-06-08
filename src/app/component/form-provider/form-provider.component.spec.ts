import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProviderComponent } from './form-provider.component';

describe('FormProviderComponent', () => {
  let component: FormProviderComponent;
  let fixture: ComponentFixture<FormProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
