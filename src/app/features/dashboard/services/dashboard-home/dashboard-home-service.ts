import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '@features/dashboard/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardHomeService {
  private API_ENDPOINT = 'user';
  private _http = inject(HttpClient);

  getUserDetails() {
    return this._http.get<IUser>(`${this.API_ENDPOINT}/user-details`);
  }
}
