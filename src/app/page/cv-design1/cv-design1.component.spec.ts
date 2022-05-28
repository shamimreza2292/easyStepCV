import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDesign1Component } from './cv-design1.component';

describe('CvDesign1Component', () => {
  let component: CvDesign1Component;
  let fixture: ComponentFixture<CvDesign1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDesign1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDesign1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
