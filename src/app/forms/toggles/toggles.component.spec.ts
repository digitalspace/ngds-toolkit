import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TogglesComponent } from './toggles.component';

describe('TogglesComponent', () => {
  let component: TogglesComponent;
  let fixture: ComponentFixture<TogglesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TogglesComponent]
    });
    fixture = TestBed.createComponent(TogglesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
