import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICollectionHistoryResponse, ICollectionsResponse } from '../../models/collections.model';
import { ITableLisingFilter } from '@shared/interfaces/filter.interface';

@Injectable({
  providedIn: 'root',
})
export class CashCollectionsService {
  private ADMIN_API_ENDPOINT = 'admin/cash';

  private _http = inject(HttpClient);

  getTotalCashCollection() {
    return this._http.get<ICollectionsResponse>(`${this.ADMIN_API_ENDPOINT}/total-collection`);
  }

  getRouterCashCollectionSummary(routerId: string) {
    return this._http.get<ICollectionsResponse>(`${this.ADMIN_API_ENDPOINT}/router/${routerId}`);
  }

  getCashCollectionHistory(routerId: string, filter?: ITableLisingFilter) {
    const params = filter ? new HttpParams({ fromObject: { ...filter } }) : undefined;
    return this._http.get<ICollectionHistoryResponse>(
      `${this.ADMIN_API_ENDPOINT}/router/${routerId}/history`,
    );
  }
}
