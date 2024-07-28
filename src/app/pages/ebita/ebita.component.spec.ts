import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbitaComponent } from './ebita.component';

describe('EbitaComponent', () => {
  let component: EbitaComponent;
  let fixture: ComponentFixture<EbitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
