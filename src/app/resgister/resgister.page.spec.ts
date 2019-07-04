import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResgisterPage } from './resgister.page';

describe('ResgisterPage', () => {
  let component: ResgisterPage;
  let fixture: ComponentFixture<ResgisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResgisterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResgisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
