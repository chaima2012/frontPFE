import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Campany1Component } from './campany1.component';

describe('Campany1Component', () => {
  let component: Campany1Component;
  let fixture: ComponentFixture<Campany1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Campany1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Campany1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
