import { ComponentFixture, TestBed } from '@angular/core/testing';

import { User5Component } from './user5.component';

describe('User5Component', () => {
  let component: User5Component;
  let fixture: ComponentFixture<User5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ User5Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(User5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
