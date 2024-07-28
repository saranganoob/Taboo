import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesaleclassComponent } from './updatesaleclass.component';

describe('UpdatesaleclassComponent', () => {
  let component: UpdatesaleclassComponent;
  let fixture: ComponentFixture<UpdatesaleclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatesaleclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesaleclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
