import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookvalueComponent } from './bookvalue.component';

describe('BookvalueComponent', () => {
  let component: BookvalueComponent;
  let fixture: ComponentFixture<BookvalueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookvalueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookvalueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
