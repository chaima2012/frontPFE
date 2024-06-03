import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaniesOverviewComponent } from './campanies-overview.component';

describe('CampaniesOverviewComponent', () => {
  let component: CampaniesOverviewComponent;
  let fixture: ComponentFixture<CampaniesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaniesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaniesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
