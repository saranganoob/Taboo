import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastAdminComponent } from './forecast-admin.component';

describe('ForecastAdminComponent', () => {
  let component: ForecastAdminComponent;
  let fixture: ComponentFixture<ForecastAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
