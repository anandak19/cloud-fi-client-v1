import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoginData } from '@features/auth/models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private END_POINT = 'user';

  private _http = inject(HttpClient);

  login(loginData: ILoginData) {
    return this._http.post(`${this.END_POINT}/web/login`, loginData);
  }

  logout() {
    return this._http.post(`${this.END_POINT}/web/logout`, {});
  }

  isLogin() {
    return this._http.get(`${this.END_POINT}/web/is-login`);
  }
}
