import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTimingComponent } from './state-timing.component';

describe('StateTimingComponent', () => {
  let component: StateTimingComponent;
  let fixture: ComponentFixture<StateTimingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateTimingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTimingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
