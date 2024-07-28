import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgConsumptionComponent } from './dg-consumption.component';

describe('DgConsumptionComponent', () => {
  let component: DgConsumptionComponent;
  let fixture: ComponentFixture<DgConsumptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgConsumptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgConsumptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
