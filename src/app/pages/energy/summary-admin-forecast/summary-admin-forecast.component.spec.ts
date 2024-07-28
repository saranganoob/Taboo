import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAdminForecastComponent } from './summary-admin-forecast.component';

describe('SummaryAdminForecastComponent', () => {
  let component: SummaryAdminForecastComponent;
  let fixture: ComponentFixture<SummaryAdminForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAdminForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryAdminForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
