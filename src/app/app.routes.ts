import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'inbox',
    loadComponent: () => import('./inbox/inbox.component').then(m => m.InboxComponent),
  },
  {
    path: 'lists',
    loadComponent: () => import('./lists/lists.component').then(m => m.ListsComponent),
  }
];
