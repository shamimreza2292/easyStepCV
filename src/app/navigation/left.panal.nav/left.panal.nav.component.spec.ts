import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Left.Panal.NavComponent } from './left.panal.nav.component';

describe('Left.Panal.NavComponent', () => {
  let component: Left.Panal.NavComponent;
  let fixture: ComponentFixture<Left.Panal.NavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Left.Panal.NavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Left.Panal.NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
