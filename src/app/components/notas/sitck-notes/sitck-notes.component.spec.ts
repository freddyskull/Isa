import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitckNotesComponent } from './sitck-notes.component';

describe('SitckNotesComponent', () => {
  let component: SitckNotesComponent;
  let fixture: ComponentFixture<SitckNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitckNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitckNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
