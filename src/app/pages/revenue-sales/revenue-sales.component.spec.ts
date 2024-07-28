import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueSalesComponent } from './revenue-sales.component';

describe('RevenueSalesComponent', () => {
  let component: RevenueSalesComponent;
  let fixture: ComponentFixture<RevenueSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevenueSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
