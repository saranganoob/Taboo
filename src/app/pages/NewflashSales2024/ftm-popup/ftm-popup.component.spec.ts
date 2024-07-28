import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FTMPopupComponent } from './ftm-popup.component';

describe('FTMPopupComponent', () => {
  let component: FTMPopupComponent;
  let fixture: ComponentFixture<FTMPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FTMPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FTMPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
