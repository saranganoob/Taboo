import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvgFxRateComponent } from './avg-fx-rate.component';

describe('AvgFxRateComponent', () => {
  let component: AvgFxRateComponent;
  let fixture: ComponentFixture<AvgFxRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvgFxRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvgFxRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
