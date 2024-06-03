import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campany5Component } from './campany5.component';

describe('Campany5Component', () => {
  let component: Campany5Component;
  let fixture: ComponentFixture<Campany5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Campany5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Campany5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
