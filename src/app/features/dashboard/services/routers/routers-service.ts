import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUserVoucherSaleResponse } from '@features/dashboard/models/coupons.model';
import { IListUserRouter } from '@features/dashboard/models/routers.model';
import { IRouterCashData } from '@features/dashboard/models/userRouters.model';

@Injectable({
  providedIn: 'root',
})
export class RoutersService {
  private API_ENDPOINT = 'router';
  private _http = inject(HttpClient);
  getUsersRouters() {
    return this._http.get<IListUserRouter[]>(this.API_ENDPOINT);
  }

  getRouterCashData(routerId: string) {
    return this._http.get<IRouterCashData>(`${this.API_ENDPOINT}/${routerId}/cash`);
  }

  getRouterVouchers(routerId: string) {
    return this._http.get<IUserVoucherSaleResponse>(`${this.API_ENDPOINT}/${routerId}`);
  }
}
