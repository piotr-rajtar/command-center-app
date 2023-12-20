import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { Idea } from '../typings';

export const startIdeaCreation = createAction(
  '[Add Idea Form] Idea Creation',
  props<{ idea: string }>(),
);

export const createIdeaActions = createActionGroup({
  source: 'Idea Creation Effect',
  events: {
    'Idea Creation Success': props<{ idea: Idea, successMessage: string }>(),
    'Idea Creation Error': props<{ errorMessage: string }>(),
  },
});

export const startIdeaUpdate = createAction(
  '[Edit Idea Form] Idea Updation',
  props<{ idea: Idea }>(),
);

export const updateIdeaActions = createActionGroup({
  source: 'Idea Updation Effect',
  events: {
    'Idea Updation Success': props<{ idea: Idea, successMessage: string }>(),
    'Idea Updation Error': props<{ errorMessage: string }>(),
  },
});

export const ideaActions = createActionGroup({
  source: 'Idea',
  events: {
    //'Assign Idea': props<{ idea: Idea }>(), //TODO: Handle idea assignation
    'Set Idea To Edit': props<{ idea: Idea }>(),
    'Idea Removal': props<{ ideaId: string }>(),
  },
});

export const removeIdeaActions = createActionGroup({
  source: 'Idea Removal Effect',
  events: {
    'Idea Removal Success': props<{ ideaId: string, successMessage: string }>(),
    'Idea Removal Error': props<{ errorMessage: string }>(),
  },
});

export const startReadIdeas = createAction(
  '[Inbox Resolver] Read Ideas'
);

export const readIdeasActions = createActionGroup({
  source: 'Read Ideas Effect',
  events: {
    'Read Ideas Success': props<{ ideas: Idea[], successMessage: string }>(),
    'Read Ideas Error': props<{ errorMessage: string }>(),
  },
});

export const clearDbSuccessMessage = createAction(
  '[Success Alert] Clear Db Success Message'
);

export const clearDbErrorMessage = createAction(
  '[Error Alert] Clear Db Error Message'
);
