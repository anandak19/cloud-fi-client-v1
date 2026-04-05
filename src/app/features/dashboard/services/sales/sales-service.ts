import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserVoucherSaleResponse } from '@features/dashboard/models/coupons.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private API_ENDPOINT = 'sales';
  private _http = inject(HttpClient);

  getVoucherSalesByRouter(routerId: string) {
    return this._http.get<IUserVoucherSaleResponse>(
      `${this.API_ENDPOINT}/user/router/${routerId}/vouchers`,
    );
  }
}
