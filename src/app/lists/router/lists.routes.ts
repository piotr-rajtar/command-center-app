import { Routes } from '@angular/router';

export const listsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../lists.component').then(m => m.ListsComponent),
  },
];
