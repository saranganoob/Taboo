import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarConsumptionComponent } from './solar-consumption.component';

describe('SolarConsumptionComponent', () => {
  let component: SolarConsumptionComponent;
  let fixture: ComponentFixture<SolarConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
