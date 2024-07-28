import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarForecastAdminComponent } from './solar-forecast-admin.component';

describe('SolarForecastAdminComponent', () => {
  let component: SolarForecastAdminComponent;
  let fixture: ComponentFixture<SolarForecastAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarForecastAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarForecastAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
