import { createSelector } from '@ngrx/store';

import { AppState } from '../../typings/store';

import * as fromInbox from './inbox.reducer';

const selectInbox = (state: AppState) => state.inbox;

export const selectAreIdeasLoaded = createSelector(
  selectInbox,
  (inboxState: fromInbox.InboxState) => inboxState.areIdeasLoaded
);

export const selectIdeas = createSelector(
  selectInbox,
  (inboxState: fromInbox.InboxState) => inboxState.ideas
);

export const selectIdeaToEdit = createSelector(
  selectInbox,
  (inboxState: fromInbox.InboxState) => inboxState.ideaToEdit
);

export const selectIsEditMode = createSelector(
  selectInbox,
  (inboxState: fromInbox.InboxState) => inboxState.isEditMode
);
