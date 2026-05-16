import { Routes } from '@angular/router';
import { UserRouters } from './pages/user-routers/user-routers';
import { UserRoutersSales } from './pages/user-routers-sales/user-routers-sales';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardHome,
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
