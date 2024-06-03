import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campany3Component } from './campany3.component';

describe('Campany3Component', () => {
  let component: Campany3Component;
  let fixture: ComponentFixture<Campany3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Campany3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Campany3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
