import { Routes } from '@angular/router';

export const UserRoutersRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/user-routers/user-routers').then((m) => m.UserRouters),
  },
  {
    path: ':routerId/sales',
    loadComponent: () =>
      import('./pages/user-routers-sales/user-routers-sales').then((m) => m.UserRoutersSales),
  },
  {
    path: ':routerId/collections',
    loadComponent: () =>
      import('./pages/cash-collections/cash-collections').then((m) => m.CashCollections),
  },
];
