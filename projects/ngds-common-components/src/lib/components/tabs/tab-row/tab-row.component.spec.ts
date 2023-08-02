import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdsTabRow } from './tab-row.component';

describe('NgdsTabRow', () => {
  let component: NgdsTabRow;
  let fixture: ComponentFixture<NgdsTabRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgdsTabRow ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgdsTabRow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
