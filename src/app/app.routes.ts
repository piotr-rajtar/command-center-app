import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'inbox',
    loadChildren: () => import('./inbox/router/inbox.routes').then(m => m.inboxRoutes),
  },
  {
    path: 'lists',
    loadChildren: () => import('./lists/router/lists.routes').then(m => m.listsRoutes),
  }
];
