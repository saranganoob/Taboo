import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSrdDivisionsComponent } from './view-srd-divisions.component';

describe('ViewSrdDivisionsComponent', () => {
  let component: ViewSrdDivisionsComponent;
  let fixture: ComponentFixture<ViewSrdDivisionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSrdDivisionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSrdDivisionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
