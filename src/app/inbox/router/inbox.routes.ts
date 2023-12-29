import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import * as fromInbox from '../store/inbox.reducer';
import * as InboxEffects from '../store/inbox.effects';

import { inboxResolver } from './inbox.resolver';

export const inboxRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../components/inbox-container/inbox-container.component')
      .then(m => m.InboxContainerComponent),
    providers: [
      provideState(
        { name: fromInbox.INBOX_FEATURE_KEY, reducer: fromInbox.inboxReducer }
      ),
      provideEffects(InboxEffects),
    ],
    resolve: [ inboxResolver ]
  },
];
