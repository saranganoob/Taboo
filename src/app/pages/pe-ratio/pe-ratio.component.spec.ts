import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PERatioComponent } from './pe-ratio.component';

describe('PERatioComponent', () => {
  let component: PERatioComponent;
  let fixture: ComponentFixture<PERatioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PERatioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PERatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
