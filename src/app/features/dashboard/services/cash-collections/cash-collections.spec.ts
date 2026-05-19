import { TestBed } from '@angular/core/testing';

import { CashCollections } from './cash-collections';

describe('CashCollections', () => {
  let service: CashCollections;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCollections);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
