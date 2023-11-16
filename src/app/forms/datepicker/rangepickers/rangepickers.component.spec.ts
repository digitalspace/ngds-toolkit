import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RangepickersComponent } from './rangepickers.component';

describe('RangepickersComponent', () => {
  let component: RangepickersComponent;
  let fixture: ComponentFixture<RangepickersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RangepickersComponent]
    });
    fixture = TestBed.createComponent(RangepickersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
