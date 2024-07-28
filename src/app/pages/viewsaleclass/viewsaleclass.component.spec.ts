import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsaleclassComponent } from './viewsaleclass.component';

describe('ViewsaleclassComponent', () => {
  let component: ViewsaleclassComponent;
  let fixture: ComponentFixture<ViewsaleclassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsaleclassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsaleclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
