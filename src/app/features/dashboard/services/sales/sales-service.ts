import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  IUserVoucherSaleResponse,
  IVoucherHistoryResponse,
} from '@features/dashboard/models/coupons.model';
import { ISalesSummery } from '@features/dashboard/models/sales.model';
import { IRangeFilter, ITableLisingFilter } from '@shared/interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private API_ENDPOINT = 'sales';
  private _http = inject(HttpClient);

  getVoucherSalesByRouter(routerId: string, filter?: IRangeFilter) {
    const params = filter ? new HttpParams({ fromObject: { ...filter } }) : undefined;
    return this._http.get<IUserVoucherSaleResponse>(
      `${this.API_ENDPOINT}/user/router/${routerId}/vouchers`,
      { params },
    );
  }

  getTotalSalesData() {
    return this._http.get<ISalesSummery>(`${this.API_ENDPOINT}/total-amount`);
  }

  getRouterSalesSummary(routerId: string) {
    return this._http.get<ISalesSummery>(`${this.API_ENDPOINT}/router/${routerId}/total`);
  }

  getVoucherSalesHistory(routerId: string, filter?: ITableLisingFilter) {
    const params = filter ? new HttpParams({ fromObject: { ...filter } }) : undefined;
    return this._http.get<IVoucherHistoryResponse>(
      `${this.API_ENDPOINT}/router/${routerId}/sales-history`,
      { params },
    );
  }
}
