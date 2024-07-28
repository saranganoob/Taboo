import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividentPayoutRatioComponent } from './divident-payout-ratio.component';

describe('DividentPayoutRatioComponent', () => {
  let component: DividentPayoutRatioComponent;
  let fixture: ComponentFixture<DividentPayoutRatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividentPayoutRatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividentPayoutRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
