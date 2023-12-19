import { createReducer, on } from '@ngrx/store';

import { Idea } from '../typings';

import * as InboxActions from './inbox.actions';

export const INBOX_FEATURE_KEY = 'inbox';

export interface InboxState {
  dbErrorMessage: string | null;
  dbSuccessMessage: string | null;
  ideas: Idea[];
  isEditMode: boolean;
  isLoading: boolean;
}

const initialState: InboxState = {
  dbErrorMessage: null,
  dbSuccessMessage: null,
  ideas: [],
  isEditMode: false,
  isLoading: false,
}

export const inboxReducer = createReducer(
  initialState,
  on(InboxActions.addIdeaActions.createIdeaSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: [...state.ideas, action.idea],
    };
  }),
  on(InboxActions.deleteIdeaActions.deleteIdeaSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: state.ideas.filter(idea => idea.id !== action.ideaId),
    };
  }),
  on(InboxActions.readIdeaActions.readIdeasSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: action.ideas,
    };
  }),
  on(InboxActions.updateIdeaActions.updateIdeaSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: state.ideas.map(idea => {
        if(idea.id !== action.idea.id) {
          return idea;
        }

        return {
          ...idea,
          content: action.idea.content,
        };
      }),
      isEditMode: false,
    }
  }),
  on(
    InboxActions.addIdeaActions.createIdeaError,
    InboxActions.deleteIdeaActions.deleteIdeaError,
    InboxActions.readIdeaActions.readIdeasError,
    InboxActions.updateIdeaActions.updateIdeaError,
    (state, action) => {
    return {
      ...state,
      dbErrorMessage: action.errorMessage,
    };
  }),
  on(InboxActions.clearDbErrorMessage, state => {
    return {
      ...state,
      dbErrorMessage: null,
    };
  }),
  on(InboxActions.clearDbSuccessMessage, state => {
    return {
      ...state,
      dbSuccessMessage: null,
    };
  }),
  on(InboxActions.ideaActions.setEditMode, state => {
    return {
      ...state,
      isEditMode: true,
    };
  }),
);
