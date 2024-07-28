import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividantDistributionTableFormatComponent } from './dividant-distribution-table-format.component';

describe('DividantDistributionTableFormatComponent', () => {
  let component: DividantDistributionTableFormatComponent;
  let fixture: ComponentFixture<DividantDistributionTableFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividantDistributionTableFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividantDistributionTableFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
