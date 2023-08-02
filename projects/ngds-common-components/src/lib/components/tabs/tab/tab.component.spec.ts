import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdsTab } from './tab.component';

describe('NgdsTab', () => {
  let component: NgdsTab;
  let fixture: ComponentFixture<NgdsTab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgdsTab ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgdsTab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
