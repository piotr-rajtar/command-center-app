import { Routes } from '@angular/router';

export const inboxRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/inbox-container/inbox-container.component')
      .then(m => m.InboxContainerComponent),
  },
];
