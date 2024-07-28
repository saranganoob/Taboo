import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CNYInrComponent } from './cny-inr.component';

describe('CNYInrComponent', () => {
  let component: CNYInrComponent;
  let fixture: ComponentFixture<CNYInrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CNYInrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CNYInrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
