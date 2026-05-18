import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard-home/dashboard-home').then(m => m.DashboardHome),
  },
  {
    path: 'routers',
    loadComponent: () => import('./pages/user-routers/user-routers').then(m => m.UserRouters),
  },
  {
    path: 'routers/:routerId',
    loadComponent: () => import('./pages/user-routers-sales/user-routers-sales').then(m => m.UserRoutersSales),
  },
  {
    path: 'cash-collections',
    loadComponent: () => import('./pages/cash-collections/cash-collections').then(m => m.CashCollections),
  }
];
