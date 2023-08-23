import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemonstratorComponent } from './demonstrator.component';

describe('DemonstratorComponent', () => {
  let component: DemonstratorComponent;
  let fixture: ComponentFixture<DemonstratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemonstratorComponent]
    });
    fixture = TestBed.createComponent(DemonstratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
