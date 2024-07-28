import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsaledataComponent } from './editsaledata.component';

describe('EditsaledataComponent', () => {
  let component: EditsaledataComponent;
  let fixture: ComponentFixture<EditsaledataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsaledataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsaledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
