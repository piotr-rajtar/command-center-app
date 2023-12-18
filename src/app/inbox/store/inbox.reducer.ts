import { createReducer } from '@ngrx/store';

import { Idea } from '../typings';

export const INBOX_FEATURE_KEY = 'inbox';

export interface InboxState {
  ideas: Idea[];
}

const initialState: InboxState = {
  ideas: [],
}

export const inboxReducer = createReducer(
  initialState,
)
