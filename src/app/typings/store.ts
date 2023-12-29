import * as fromInbox from '../inbox/store/inbox.reducer';

export interface AppState {
  [fromInbox.INBOX_FEATURE_KEY]: fromInbox.InboxState;
}
