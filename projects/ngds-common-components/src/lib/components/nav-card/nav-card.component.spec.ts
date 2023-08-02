import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgdsNavCard } from './nav-card.component';

describe('NgdsNavCard', () => {
  let component: NgdsNavCard;
  let fixture: ComponentFixture<NgdsNavCard>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgdsNavCard]
    });
    fixture = TestBed.createComponent(NgdsNavCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
