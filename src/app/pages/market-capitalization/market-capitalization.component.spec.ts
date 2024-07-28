import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketCapitalizationComponent } from './market-capitalization.component';

describe('MarketCapitalizationComponent', () => {
  let component: MarketCapitalizationComponent;
  let fixture: ComponentFixture<MarketCapitalizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketCapitalizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketCapitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
