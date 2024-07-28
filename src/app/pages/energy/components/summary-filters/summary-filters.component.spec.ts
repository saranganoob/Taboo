import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryFiltersComponent } from './summary-filters.component';

describe('SummaryFiltersComponent', () => {
  let component: SummaryFiltersComponent;
  let fixture: ComponentFixture<SummaryFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
