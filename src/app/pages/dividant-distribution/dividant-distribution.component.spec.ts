import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividantDistributionComponent } from './dividant-distribution.component';

describe('DividantDistributionComponent', () => {
  let component: DividantDistributionComponent;
  let fixture: ComponentFixture<DividantDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividantDistributionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividantDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
