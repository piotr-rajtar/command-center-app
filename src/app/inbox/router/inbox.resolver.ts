import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, tap } from 'rxjs';

import { AppState } from '../../typings/store';

import * as InboxActions from '../store/inbox.actions';
import * as InboxSelectors from '../store/inbox.selectors';


export const inboxResolver: ResolveFn<boolean> = (_route, _state) => {
  const store = inject<Store<AppState>>(Store);

  return store.select(InboxSelectors.selectAreIdeasLoaded).pipe(
    first(),
    tap(areIdeasLoaded => {
      if(areIdeasLoaded) {
        return;
      }

      store.dispatch(InboxActions.startReadIdeas());
    }),
  );
}
