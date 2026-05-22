import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterCollectionSummaryCard } from './router-collection-summary-card';

describe('RouterCollectionSummaryCard', () => {
  let component: RouterCollectionSummaryCard;
  let fixture: ComponentFixture<RouterCollectionSummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterCollectionSummaryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouterCollectionSummaryCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
