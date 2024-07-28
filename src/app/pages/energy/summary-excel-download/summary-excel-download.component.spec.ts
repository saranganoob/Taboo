import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryExcelDownloadComponent } from './summary-excel-download.component';

describe('SummaryExcelDownloadComponent', () => {
  let component: SummaryExcelDownloadComponent;
  let fixture: ComponentFixture<SummaryExcelDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryExcelDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryExcelDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
