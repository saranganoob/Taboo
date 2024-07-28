import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarForecastComponent } from './solar-forecast.component';

describe('SolarForecastComponent', () => {
  let component: SolarForecastComponent;
  let fixture: ComponentFixture<SolarForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
