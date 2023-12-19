import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

import { Idea } from '../typings';

export const triggerIdeaCreation = createAction(
  '[Add Idea Form] Trigger Idea Creation',
  props<{ idea: string }>(),
);

export const addIdeaActions = createActionGroup({
  source: 'Trigger Idea Creation Effect',
  events: {
    'Create Idea': emptyProps(),
    'Create Idea Success': props<{ idea: Idea, successMessage: string }>(),
    'Create Idea Error': props<{ errorMessage: string }>(),
  },
});

export const triggerIdeaEdition = createAction(
  '[Edit Idea Form] Trigger Idea Edition',
  props<{ idea: Idea }>(),
);

export const updateIdeaActions = createActionGroup({
  source: 'Trigger Idea Edition Effect',
  events: {
    'Update Idea': emptyProps(),
    'Update Idea Success': props<{ idea: Idea, successMessage: string }>(),
    'Update Idea Error': props<{ errorMessage: string }>(),
  },
});

export const ideaActions = createActionGroup({
  source: 'Idea',
  events: {
    'Assign Idea': props<{ idea: Idea }>(),
    'Set Edit Mode': emptyProps(),
    'Trigger Idea Removal': props<{ ideaId: string }>(),
  },
});

export const deleteIdeaActions = createActionGroup({
  source: 'Trigger Idea Removal Effect',
  events: {
    'Delete Idea': emptyProps(),
    'Delete Idea Success': props<{ ideaId: string, successMessage: string }>(),
    'Delete Idea Error': props<{ errorMessage: string }>(),
  },
});

export const getIdeas = createAction(
  '[Inbox Resolver] Trigger Get Ideas'
);

export const readIdeaActions = createActionGroup({
  source: 'Trigger Get Ideas Effect',
  events: {
    'Read Ideas': emptyProps(),
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
