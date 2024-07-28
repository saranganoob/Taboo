import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YTMPopupComponent } from './ytm-popup.component';

describe('YTMPopupComponent', () => {
  let component: YTMPopupComponent;
  let fixture: ComponentFixture<YTMPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YTMPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YTMPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
