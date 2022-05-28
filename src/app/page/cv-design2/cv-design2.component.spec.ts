import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDesign2Component } from './cv-design2.component';

describe('CvDesign2Component', () => {
  let component: CvDesign2Component;
  let fixture: ComponentFixture<CvDesign2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CvDesign2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDesign2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
