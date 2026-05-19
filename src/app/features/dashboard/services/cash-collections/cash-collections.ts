import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICollectionsResponse } from '../../models/collections.model';

@Injectable({
  providedIn: 'root',
})
export class CashCollections {
  private ADMIN_API_ENDPOINT = 'admin/cash';

  private _http = inject(HttpClient);

  getTotalCashCollection() {
    return this._http.get<ICollectionsResponse>(`${this.ADMIN_API_ENDPOINT}/total-collection`);
  }
}
