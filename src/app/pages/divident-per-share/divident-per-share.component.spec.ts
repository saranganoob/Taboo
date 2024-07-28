import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DividentPerShareComponent } from './divident-per-share.component';

describe('DividentPerShareComponent', () => {
  let component: DividentPerShareComponent;
  let fixture: ComponentFixture<DividentPerShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DividentPerShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DividentPerShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
