import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryAdminComponent } from './summary-admin.component';

describe('SummaryAdminComponent', () => {
  let component: SummaryAdminComponent;
  let fixture: ComponentFixture<SummaryAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SummaryAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
