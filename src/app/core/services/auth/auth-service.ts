import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ILoginData } from '@features/auth/models/login.model';
import { ICurrentUser } from '@features/dashboard/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private END_POINT = 'user';

  private _http = inject(HttpClient);

  private _currentUser = signal<ICurrentUser | null>(null);

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  setCurrentUser(user: ICurrentUser | null) {
    this._currentUser.set(user);
  }

  login(loginData: ILoginData) {
    return this._http.post(`${this.END_POINT}/web/login`, loginData);
  }

  logout() {
    return this._http.post(`${this.END_POINT}/web/logout`, {});
  }

  isLogin() {
    return this._http.get(`${this.END_POINT}/web/is-login`);
  }

  getCurrentUser(){
    return this._http.get<ICurrentUser>(`${this.END_POINT}/me`);
  }
}
