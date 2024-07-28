import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedataconfirmComponent } from './savedataconfirm.component';

describe('SavedataconfirmComponent', () => {
  let component: SavedataconfirmComponent;
  let fixture: ComponentFixture<SavedataconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedataconfirmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedataconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
