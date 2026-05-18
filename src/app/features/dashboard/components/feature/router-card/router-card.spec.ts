import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterCard } from './router-card';

describe('RouterCard', () => {
  let component: RouterCard;
  let fixture: ComponentFixture<RouterCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
