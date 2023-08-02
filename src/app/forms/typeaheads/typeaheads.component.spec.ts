import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeaheadsComponent } from './typeaheads.component';

describe('TypeaheadsComponent', () => {
  let component: TypeaheadsComponent;
  let fixture: ComponentFixture<TypeaheadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeaheadsComponent]
    });
    fixture = TestBed.createComponent(TypeaheadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
