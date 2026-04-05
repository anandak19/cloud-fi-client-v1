import { Routes } from '@angular/router';
import { UserRouters } from './pages/user-routers/user-routers';
import { UserRoutersSales } from './pages/user-routers-sales/user-routers-sales';

export const DashboardRoutes: Routes = [
  {
    path: '',
    redirectTo: 'routers',
    pathMatch: 'full'
  },
  {
    path: 'routers',
    component: UserRouters,
  },
  {
    path: 'routers/:routerId',
    component: UserRoutersSales,
  },
];