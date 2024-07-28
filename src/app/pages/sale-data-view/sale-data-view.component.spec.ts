import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleDataViewComponent } from './sale-data-view.component';

describe('SaleDataViewComponent', () => {
  let component: SaleDataViewComponent;
  let fixture: ComponentFixture<SaleDataViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleDataViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
