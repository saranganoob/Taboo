import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesclassificationComponent } from './salesclassification.component';

describe('SalesclassificationComponent', () => {
  let component: SalesclassificationComponent;
  let fixture: ComponentFixture<SalesclassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesclassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesclassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
