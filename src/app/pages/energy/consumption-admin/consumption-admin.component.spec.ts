import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionAdminComponent } from './consumption-admin.component';

describe('ConsumptionAdminComponent', () => {
  let component: ConsumptionAdminComponent;
  let fixture: ComponentFixture<ConsumptionAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumptionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
