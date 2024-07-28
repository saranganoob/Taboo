import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EURInrComponent } from './eur-inr.component';

describe('EURInrComponent', () => {
  let component: EURInrComponent;
  let fixture: ComponentFixture<EURInrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EURInrComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EURInrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
