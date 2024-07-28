import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgSummaryConsumptionComponent } from './dg-summary-consumption.component';

describe('DgSummaryConsumptionComponent', () => {
  let component: DgSummaryConsumptionComponent;
  let fixture: ComponentFixture<DgSummaryConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgSummaryConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgSummaryConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
