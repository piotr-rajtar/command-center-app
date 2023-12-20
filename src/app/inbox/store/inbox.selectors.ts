import { createSelector } from '@ngrx/store';

import { AppState } from '../../typings/store';

import { InboxState } from './inbox.reducer';

export const selectInbox = (state: AppState) => state.inbox;

export const selectAreIdeasLoaded = createSelector(
  selectInbox,
  (inboxState: InboxState) => inboxState.areIdeasLoaded
);

export const selectIdeas = createSelector(
  selectInbox,
  (inboxState: InboxState) => inboxState.ideas
);

export const selectIsEditMode = createSelector(
  selectInbox,
  (inboxState: InboxState) => inboxState.isEditMode
);

export const selectIdeaToEdit = createSelector(
  selectInbox,
  (inboxState: InboxState) => inboxState.ideaToEdit
);
