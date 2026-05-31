import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { PageTitleComponent } from '@features/dashboard/components/ui/page-title-component/page-title-component';
import { BackButtonComponent } from '@features/dashboard/components/ui/back-button-component/back-button-component';
import {
  ICollectionHistoryItem,
  ICollectionsResponse,
} from '@features/dashboard/models/collections.model';
import { RouterCollectionSummaryCard } from '@features/dashboard/components/feature/router-collection-summary-card/router-collection-summary-card';
import { CashCollectionsService } from '@features/dashboard/services/cash-collections/cash-collections';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IVoucherSaleHistory } from '@features/dashboard/models/coupons.model';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { ITableLisingFilter } from '@shared/interfaces/filter.interface';
import { TableListingComponent } from '@features/dashboard/components/feature/table-listing-component/table-listing-component';
import { PaginatorComponent } from '@features/dashboard/components/feature/paginator-component/paginator-component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cash-collections',
  imports: [
    PageTitleComponent,
    BackButtonComponent,
    RouterCollectionSummaryCard,
    TableListingComponent,
    PaginatorComponent,
  ],
  templateUrl: './cash-collections.html',
  styleUrl: './cash-collections.scss',
})
export class CashCollections implements OnInit {
  @Input() routerId!: string;
  collectionSummary = signal<ICollectionsResponse | null>(null);

  private _cashCollectionsService = inject(CashCollectionsService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  tableListingFilter = signal<ITableLisingFilter>({ page: 0, limit: 1 });

  historyColumns: IMatColumns[] = [
    { label: 'Paid By User', key: 'paidUser' },
    { label: 'Amount', key: 'amount' },
    { label: 'Date & Time', key: 'createdAt' },
    { label: 'Collected By', key: 'collectedUserName' },
    { label: 'Collecters Balance', key: 'collectedUserBalance' },
    { label: 'Comment', key: 'comment' },
  ];

  collectionHistory = signal<ICollectionHistoryItem[]>([]);
  historyLength = signal<number>(0);

  // collection summary
  getCollectionSummary() {
    this._cashCollectionsService
      .getRouterCashCollectionSummary(this.routerId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response) => {
          this.collectionSummary.set(response);
        },
        error: () => {
          this._snackbar.error('Error fetching cash collection data');
        },
      });
  }

  // collection history
  getCashCollectionHistory() {
    this._cashCollectionsService
      .getCashCollectionHistory(this.routerId, this.tableListingFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.collectionHistory.set(res.collectionHistory);
          this.historyLength.set(res.total);
        },
        error: () => {
          this._snackbar.error('Error in getting cash collection history');
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.tableListingFilter.update((curr) => ({
      ...curr,
      limit: event.pageSize,
      page: event.pageIndex,
    }));

    this.getCashCollectionHistory();
  }

  ngOnInit() {
    if (!this.routerId) {
      this._snackbar.error('Select a router to view collection summary');
      return;
    }
    this.getCollectionSummary();
    this.getCashCollectionHistory();
  }
}
