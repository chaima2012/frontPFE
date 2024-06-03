import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampanyComponent } from './add-campany.component';

describe('AddCampanyComponent', () => {
  let component: AddCampanyComponent;
  let fixture: ComponentFixture<AddCampanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCampanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
