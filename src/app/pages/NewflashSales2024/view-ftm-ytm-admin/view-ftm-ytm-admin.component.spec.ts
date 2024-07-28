import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFtmYtmAdminComponent } from './view-ftm-ytm-admin.component';

describe('ViewFtmYtmAdminComponent', () => {
  let component: ViewFtmYtmAdminComponent;
  let fixture: ComponentFixture<ViewFtmYtmAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFtmYtmAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFtmYtmAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
