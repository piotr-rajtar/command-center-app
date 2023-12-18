import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';

import { INBOX_FEATURE_KEY, inboxReducer } from '../store/inbox.reducer';

export const inboxRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/inbox-container/inbox-container.component')
      .then(m => m.InboxContainerComponent),
    providers: [
      provideState({ name: INBOX_FEATURE_KEY, reducer: inboxReducer }),
    ],
  },
];
