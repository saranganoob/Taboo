import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarConsumptionAdminComponent } from './solar-consumption-admin.component';

describe('SolarConsumptionAdminComponent', () => {
  let component: SolarConsumptionAdminComponent;
  let fixture: ComponentFixture<SolarConsumptionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolarConsumptionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolarConsumptionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
