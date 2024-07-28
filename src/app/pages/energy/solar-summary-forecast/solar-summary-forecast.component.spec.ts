import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSummaryForecastComponent } from './solar-summary-forecast.component';

describe('SolarSummaryForecastComponent', () => {
  let component: SolarSummaryForecastComponent;
  let fixture: ComponentFixture<SolarSummaryForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarSummaryForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSummaryForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
