import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
} from 'rxjs';

import { IdeasHttpService } from '../services/ideas-http.service';

import * as InboxActions from './inbox.actions';

export const createIdea = createEffect(
  (actions$ = inject(Actions), ideasHttpService = inject(IdeasHttpService)) => {
    return actions$.pipe(
      ofType(InboxActions.startIdeaCreation),
      concatMap(action => {
        return ideasHttpService
          .createIdea(action.idea)
          .pipe(
            map(idea =>
              InboxActions.createIdeaActions.ideaCreationSuccess({
                idea,
                successMessage: 'Idea created successfully',
              })
            ),
            catchError(() =>
              of(InboxActions.createIdeaActions.ideaCreationError({
                errorMessage: 'Idea creation failed',
              })),
            ),
          );
      }),
    );
  },
  { functional: true }
);

export const deleteIdea = createEffect(
  (actions$ = inject(Actions), ideasHttpService = inject(IdeasHttpService)) => {
    return actions$.pipe(
      ofType(InboxActions.ideaActions.ideaRemoval),
      mergeMap(action => {
        return ideasHttpService
          .deleteIdea(action.ideaId)
          .pipe(
            map(() => InboxActions.removeIdeaActions.ideaRemovalSuccess({
              ideaId: action.ideaId,
              successMessage: 'Idea deleted successfully'
            })),
            catchError(() =>
              of(InboxActions.removeIdeaActions.ideaRemovalError({
                errorMessage: 'Idea deletion failed'
              }))
            ),
          );
      }),
    );
  },
  { functional: true }
);

export const readIdeas = createEffect(
  (actions$ = inject(Actions), ideasHttpService = inject(IdeasHttpService)) => {
    return actions$.pipe(
      ofType(InboxActions.startReadIdeas),
      exhaustMap(() => {
        return ideasHttpService
          .readIdeas()
          .pipe(
            map(ideas =>
              InboxActions.readIdeasActions.readIdeasSuccess({
                ideas,
                successMessage: 'Ideas read successfully',
              })
            ),
            catchError(() =>
              of(InboxActions.readIdeasActions.readIdeasError({
                errorMessage: 'Ideas read failed',
              }))
            ),
          );
      }),
    );
  },
  { functional: true }
);

export const updateIdea = createEffect(
  (actions$ = inject(Actions), ideasHttpService = inject(IdeasHttpService)) => {
    return actions$.pipe(
      ofType(InboxActions.startIdeaUpdate),
      concatMap(action => {
        return ideasHttpService
          .updateIdea(action.idea)
          .pipe(
            map(() =>
              InboxActions.updateIdeaActions.ideaUpdationSuccess({
                idea: action.idea,
                successMessage: 'Idea updated Successfully'
              })
            ),
            catchError(() =>
              of(InboxActions.updateIdeaActions.ideaUpdationError({
                errorMessage: 'Idea update failed'
              }))
            ),
          );
      }),
    );
  },
  { functional: true }
)
