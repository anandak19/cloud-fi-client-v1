import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCollections } from './cash-collections';

describe('CashCollections', () => {
  let component: CashCollections;
  let fixture: ComponentFixture<CashCollections>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashCollections]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashCollections);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
