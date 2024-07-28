import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesdataComponent } from './salesdata.component';

describe('SalesdataComponent', () => {
  let component: SalesdataComponent;
  let fixture: ComponentFixture<SalesdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
