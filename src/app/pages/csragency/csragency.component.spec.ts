import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsragencyComponent } from './csragency.component';

describe('CsragencyComponent', () => {
  let component: CsragencyComponent;
  let fixture: ComponentFixture<CsragencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsragencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsragencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
