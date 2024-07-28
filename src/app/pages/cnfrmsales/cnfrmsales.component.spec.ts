import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnfrmsalesComponent } from './cnfrmsales.component';

describe('CnfrmsalesComponent', () => {
  let component: CnfrmsalesComponent;
  let fixture: ComponentFixture<CnfrmsalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CnfrmsalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CnfrmsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
