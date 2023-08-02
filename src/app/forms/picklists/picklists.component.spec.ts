import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicklistsComponent } from './picklists.component';

describe('PicklistsComponent', () => {
  let component: PicklistsComponent;
  let fixture: ComponentFixture<PicklistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PicklistsComponent]
    });
    fixture = TestBed.createComponent(PicklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
