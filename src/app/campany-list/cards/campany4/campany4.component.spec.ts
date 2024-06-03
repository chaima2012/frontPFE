import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campany4Component } from './campany4.component';

describe('Campany4Component', () => {
  let component: Campany4Component;
  let fixture: ComponentFixture<Campany4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Campany4Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Campany4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
