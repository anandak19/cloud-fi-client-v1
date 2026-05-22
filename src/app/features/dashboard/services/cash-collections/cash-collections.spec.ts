import { TestBed } from '@angular/core/testing';

import { CashCollectionsService } from './cash-collections';

describe('CashCollectionsService', () => {
  let service: CashCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
