import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdatarevComponent } from './salesdatarev.component';

describe('SalesdatarevComponent', () => {
  let component: SalesdatarevComponent;
  let fixture: ComponentFixture<SalesdatarevComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesdatarevComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdatarevComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
