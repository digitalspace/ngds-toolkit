import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonComponentsComponent } from './common-components.component';

describe('CommonComponentsComponent', () => {
  let component: CommonComponentsComponent;
  let fixture: ComponentFixture<CommonComponentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonComponentsComponent]
    });
    fixture = TestBed.createComponent(CommonComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
