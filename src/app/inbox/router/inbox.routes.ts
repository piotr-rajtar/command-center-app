import { Routes } from '@angular/router';

export const inboxRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../inbox.component').then(m => m.InboxComponent),
  },
];
