import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Doc.Design1Component } from './doc.design1.component';

describe('Doc.Design1Component', () => {
  let component: Doc.Design1Component;
  let fixture: ComponentFixture<Doc.Design1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Doc.Design1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Doc.Design1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
