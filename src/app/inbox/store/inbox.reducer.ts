import { createReducer, on } from '@ngrx/store';

import { Idea } from '../typings';

import * as InboxActions from './inbox.actions';

export const INBOX_FEATURE_KEY = 'inbox';

export interface InboxState {
  areIdeasLoaded: boolean;
  dbErrorMessage: string | null;
  dbSuccessMessage: string | null;
  ideaToEdit: Idea | null;
  ideas: Idea[];
  isEditMode: boolean;
  //isLoading: boolean; //TODO: Handle data loading
}

const initialState: InboxState = {
  areIdeasLoaded: false,
  dbErrorMessage: null,
  dbSuccessMessage: null,
  ideaToEdit: null,
  ideas: [],
  isEditMode: false,
  //isLoading: false, //TODO: Handle data loading
}

export const inboxReducer = createReducer(
  initialState,
  on(InboxActions.createIdeaActions.ideaCreationSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: [...state.ideas, action.idea],
    };
  }),
  on(InboxActions.removeIdeaActions.ideaRemovalSuccess, (state, action) => {
    return {
      ...state,
      dbSuccessMessage: action.successMessage,
      ideas: state.ideas.filter(idea => idea.id !== action.ideaId),
    };
  }),
  on(InboxActions.readIdeasActions.readIdeasSuccess, (state, action) => {
    return {
      ...state,
      areIdeasLoaded: true,
      dbSuccessMessage: action.successMessage,
      ideas: action.ideas,
    };
  }),
  on(InboxActions.updateIdeaActions.ideaUpdationSuccess, (state, action) => {
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
    InboxActions.createIdeaActions.ideaCreationError,
    InboxActions.removeIdeaActions.ideaRemovalError,
    InboxActions.readIdeasActions.readIdeasError,
    InboxActions.updateIdeaActions.ideaUpdationError,
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
  on(InboxActions.ideaActions.setIdeaToEdit, (state, action) => {
    return {
      ...state,
      ideaToEdit: action.idea,
      isEditMode: true,
    };
  }),
);
