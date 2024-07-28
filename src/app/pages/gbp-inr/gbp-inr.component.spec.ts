import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GBPInrComponent } from './gbp-inr.component';

describe('GBPInrComponent', () => {
  let component: GBPInrComponent;
  let fixture: ComponentFixture<GBPInrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GBPInrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GBPInrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
