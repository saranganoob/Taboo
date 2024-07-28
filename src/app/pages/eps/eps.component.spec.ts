import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EPSComponent } from './eps.component';

describe('EPSComponent', () => {
  let component: EPSComponent;
  let fixture: ComponentFixture<EPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EPSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
