import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsaledatapartComponent } from './viewsaledatapart.component';

describe('ViewsaledatapartComponent', () => {
  let component: ViewsaledatapartComponent;
  let fixture: ComponentFixture<ViewsaledatapartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewsaledatapartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsaledatapartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
