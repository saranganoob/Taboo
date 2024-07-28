import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarSummaryConsumptionComponent } from './solar-summary-consumption.component';

describe('SolarSummaryConsumptionComponent', () => {
  let component: SolarSummaryConsumptionComponent;
  let fixture: ComponentFixture<SolarSummaryConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarSummaryConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarSummaryConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
