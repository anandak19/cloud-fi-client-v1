import { Component, Input, signal, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PageEvent } from '@angular/material/paginator';
import { SnackbarService } from '@core/services/snackbar/snackbar-service';
import { PaginatorComponent } from '@features/dashboard/components/feature/paginator-component/paginator-component';
import { RangeFilter } from '@features/dashboard/components/feature/range-filter/range-filter';
import { RouterSalesCardComponent } from '@features/dashboard/components/feature/router-sales-card-component/router-sales-card-component';
import { TableListingComponent } from '@features/dashboard/components/feature/table-listing-component/table-listing-component';
import { BackButtonComponent } from '@features/dashboard/components/ui/back-button-component/back-button-component';
import { PageTitleComponent } from '@features/dashboard/components/ui/page-title-component/page-title-component';
import { IVoucherSaleHistory } from '@features/dashboard/models/coupons.model';
import { ISalesSummery } from '@features/dashboard/models/sales.model';
import { SalesService } from '@features/dashboard/services/sales/sales-service';
import { ITableLisingFilter } from '@shared/interfaces/filter.interface';
import { IMatColumns } from '@shared/interfaces/table.interface';

@Component({
  selector: 'app-user-routers-sales',
  imports: [
    PageTitleComponent,
    BackButtonComponent,
    RouterSalesCardComponent,
    TableListingComponent,
    PaginatorComponent,
    RangeFilter,
  ],
  templateUrl: './user-routers-sales.html',
  styleUrl: './user-routers-sales.scss',
})
export class UserRoutersSales {
  @Input() routerId!: string;
  routerSalesSummary = signal<ISalesSummery | null>(null);

  private _saleService = inject(SalesService);
  private _snackbar = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);

  tableListingFilter = signal<ITableLisingFilter>({ page: 0, limit: 10 });

  couponColumns: IMatColumns[] = [
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Coupon Count', key: 'count' },
    { label: 'Coupon Number', key: 'couponNumber' },
    { label: 'Profile', key: 'profile' },
    { label: 'Cost', key: 'cost' },
    { label: 'Sold By', key: 'soldBy' },
    { label: 'Date & Time', key: 'timeStamp' },
  ];

  voucherHistory = signal<IVoucherSaleHistory[]>([]);
  historyLength = signal<number>(0);

  onPageChange(event: PageEvent) {
    this.tableListingFilter.update((curr) => ({
      ...curr,
      limit: event.pageSize,
      page: event.pageIndex,
    }));

    this.getVoucherHistory();
  }

  onRangeFilterChange(filterData: { startDate: string; endDate: string }) {
    this.tableListingFilter.update((curr) => ({
      ...curr,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
    }));

    this.getVoucherHistory();
  }

  onRangeFilterReset() {
    this.tableListingFilter.update((curr) => {
      const { startDate, endDate, ...rest } = curr;
      return { rest, page: 0 };
    });
    this.getVoucherHistory();
  }

  getRouterSalesSummary() {
    this._saleService
      .getRouterSalesSummary(this.routerId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.routerSalesSummary.set(res);
        },
        error: () => {
          this._snackbar.error('Error fetching router sales summary');
        },
      });
  }

  getVoucherHistory() {
    this._saleService
      .getVoucherSalesHistory(this.routerId, this.tableListingFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.voucherHistory.set(res.voucherHistory);
          this.historyLength.set(res.total);
        },
        error: () => {
          this._snackbar.error('Faild to fetch voucher history');
        },
      });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getRouterSalesSummary();
    this.getVoucherHistory();
  }
}
