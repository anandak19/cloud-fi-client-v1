import { Component, inject, Input, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ICoupon } from '@features/dashboard/models/coupons.model';
import { IRouterCashData } from '@features/dashboard/models/userRouters.model';
import { RoutersService } from '@features/dashboard/services/routers/routers-service';
import { SalesService } from '@features/dashboard/services/sales/sales-service';
import { IMatColumns } from '@shared/interfaces/table.interface';
import { PageTitleComponent } from "@features/dashboard/components/ui/page-title-component/page-title-component";
import { BackButtonComponent } from "@features/dashboard/components/ui/back-button-component/back-button-component";
import { RouterSalesCardComponent } from "@features/dashboard/components/feature/router-sales-card-component/router-sales-card-component";
import { TableListingComponent } from "@features/dashboard/components/feature/table-listing-component/table-listing-component";
import { PaginatorComponent } from "@features/dashboard/components/feature/paginator-component/paginator-component";

@Component({
  selector: 'app-user-routers-sales',
  imports: [PageTitleComponent, BackButtonComponent, RouterSalesCardComponent, TableListingComponent, PaginatorComponent],
  templateUrl: './user-routers-sales.html',
  styleUrl: './user-routers-sales.scss',
})
export class UserRoutersSales {
  @Input() routerId!: string;

  routerCashData = signal<IRouterCashData | null>(null);

  // router service
  private _routerService = inject(RoutersService);
  private _saleService = inject(SalesService);

  pageSize = 5;
  pageIndex = 0;
  paginatedData: ICoupon[] = [];

  couponColumns: IMatColumns[] = [
    { label: 'Phone Number', key: 'phoneNumber' },
    { label: 'Coupon Count', key: 'count' },
    { label: 'Coupon Number', key: 'couponNumber' },
    { label: 'Profile', key: 'profile' },
    { label: 'Cost', key: 'cost' },
    { label: 'Date', key: 'date' },
  ];

  coupons: ICoupon[] = [];

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.coupons.slice(start, end);
  }

  getRouterCashData() {
    this._routerService.getRouterCashData(this.routerId).subscribe({
      next: (res) => {
        console.log(res);
        this.routerCashData.set(res);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getVouchers() {
    this._saleService.getVoucherSalesByRouter(this.routerId).subscribe({
      next: (res) => {
        this.coupons = res.vouchers;
        this.updatePaginatedData();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getRouterCashData();
    this.getVouchers();
    this.updatePaginatedData();
  }
}
