import { Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth/auth-guard';
import { guestGuard } from '@core/guards/guest/guest-guard';
// import { DashboardRoutes } from './features/dashboard/dashboard.route';
import { DashboardRoutes } from '@features/dashboard/dashboard.route';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import(
        './features/dashboard/dashboard-layout/dashboard-layout'
      ).then((c) => c.DashboardLayout),
    canActivate: [authGuard],
    children: DashboardRoutes,
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login').then(
        (c) => c.Login
      ),
    canActivate: [guestGuard],
  },
];
