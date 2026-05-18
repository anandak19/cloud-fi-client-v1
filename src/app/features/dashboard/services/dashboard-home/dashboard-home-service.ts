import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser, IUserFinancialSummary } from '@features/dashboard/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private API_ENDPOINT = 'user';
  private _http = inject(HttpClient);

  getUserDetails() {
    return this._http.get<IUser>(`${this.API_ENDPOINT}/user-details`);
  }

  getUserFinancialSummary() {
    return this._http.get<IUserFinancialSummary>(`${this.API_ENDPOINT}/financial-summary`);
  }
}
