import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividantDistributionBarGraphComponent } from './dividant-distribution-bar-graph.component';

describe('DividantDistributionBarGraphComponent', () => {
  let component: DividantDistributionBarGraphComponent;
  let fixture: ComponentFixture<DividantDistributionBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividantDistributionBarGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividantDistributionBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
