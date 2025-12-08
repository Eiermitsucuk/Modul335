import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'ticket-list',
        loadComponent: () => import('./pages/ticket-list/ticket-list.page').then(m => m.TicketListPage)
      },
      {
        path: 'ticket-create',
        loadComponent: () => import('./pages/ticket-create/ticket-create.page').then(m => m.TicketCreatePage)
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings.page').then(m => m.SettingsPage)
      },
      {
        path: 'ticket-detail/:id',
        loadComponent: () => import('./pages/ticket-detail/ticket-detail.page').then(m => m.TicketDetailPage)
      },
    ]
  },
];
