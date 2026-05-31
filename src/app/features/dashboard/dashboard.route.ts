import { Routes } from '@angular/router';

export const DashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/dashboard-home/dashboard-home').then((m) => m.DashboardHome),
  },
  {
    path: 'routers',
    loadComponent: () =>
      import('./pages/user-routers/user-routers-layout/user-routers-layout').then(
        (m) => m.UserRoutersLayout,
      ),
    loadChildren: () =>
      import('./pages/user-routers/user-routers.route').then((m) => m.UserRoutersRoute),
  },
  {
    path: 'analytics',
    loadComponent: () =>
      import('./pages/analytics/analytics').then((m) => m.Analytics),
  }
];
