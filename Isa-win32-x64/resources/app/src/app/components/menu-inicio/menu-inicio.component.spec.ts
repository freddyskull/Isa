import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInicioComponent } from './menu-inicio.component';

describe('MenuInicioComponent', () => {
  let component: MenuInicioComponent;
  let fixture: ComponentFixture<MenuInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuInicioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
