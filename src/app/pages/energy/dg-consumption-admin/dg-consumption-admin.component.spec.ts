import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DgConsumptionAdminComponent } from './dg-consumption-admin.component';

describe('DgConsumptionAdminComponent', () => {
  let component: DgConsumptionAdminComponent;
  let fixture: ComponentFixture<DgConsumptionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DgConsumptionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DgConsumptionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
