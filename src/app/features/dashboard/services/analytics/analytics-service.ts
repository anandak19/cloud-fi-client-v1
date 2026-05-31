import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {  ISalesAnalyticsResponse } from '@features/dashboard/models/analytics.model';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private ADMIN_API_ENDPOINT = 'analytics';

  private _http = inject(HttpClient);

  getSalesAnalytics() {
    return this._http.get<ISalesAnalyticsResponse>(`${this.ADMIN_API_ENDPOINT}/sales`);
  }
}
