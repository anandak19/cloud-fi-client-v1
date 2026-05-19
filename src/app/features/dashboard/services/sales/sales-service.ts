import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserVoucherSaleResponse } from '@features/dashboard/models/coupons.model';
import { ITotalSalesResponse } from '@features/dashboard/models/sales.model';
import { IRangeFilter } from '@shared/interfaces/filter.interface';

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
    return this._http.get<ITotalSalesResponse>(`${this.API_ENDPOINT}/total-amount`);
  }
}
