import {
  INBOX_FEATURE_KEY,
  InboxState,
} from '../inbox/store/inbox.reducer';

export interface AppState {
  [INBOX_FEATURE_KEY]: InboxState;
}
