import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campany2Component } from './campany2.component';

describe('Campany2Component', () => {
  let component: Campany2Component;
  let fixture: ComponentFixture<Campany2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Campany2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Campany2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
