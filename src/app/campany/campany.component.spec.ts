import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanyComponent } from './campany.component';

describe('CampanyComponent', () => {
  let component: CampanyComponent;
  let fixture: ComponentFixture<CampanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
