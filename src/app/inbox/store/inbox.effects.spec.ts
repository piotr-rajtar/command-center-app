import { of, throwError } from 'rxjs';

import { IdeasHttpService } from '../services/ideas-http.service';
import { Idea } from '../typings';

import * as InboxActions from './inbox.actions';
import * as InboxEffects from './inbox.effects';

describe('Inbox effects', () => {
  let ideasHttpService: IdeasHttpService;

  it('should return ideaCreationSuccess action on createIdea success', () => {
    ideasHttpService = {
      createIdea: (idea: string) => of({ id: '1', content: idea }),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startIdeaCreation({ idea: 'Content' }));

    InboxEffects
      .createIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.createIdeaActions.ideaCreationSuccess({
            idea: { id: '1', content: 'Content' },
            successMessage: 'Idea created successfully',
          })
        );
      });
  });

  it('should return ideaCreationError action on createIdea error', () => {
    ideasHttpService = {
      createIdea: () => throwError(() => new Error()),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startIdeaCreation({ idea: 'Content' }));

    InboxEffects
      .createIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.createIdeaActions.ideaCreationError({
            errorMessage: 'Idea creation failed',
          })
        );
      });
  });

  it('should return ideaRemovalSuccess action on deleteIdea success', () => {
    ideasHttpService = {
      deleteIdea: () => of(null),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.ideaActions.startIdeaRemoval({ ideaId: '1' }));

    InboxEffects
      .deleteIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.removeIdeaActions.ideaRemovalSuccess({
            ideaId: '1',
            successMessage: 'Idea deleted successfully',
          })
        );
      });
  });

  it('should return ideaRemovalError action on deleteIdea error', () => {
    ideasHttpService = {
      deleteIdea: () => throwError(() => new Error()),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.ideaActions.startIdeaRemoval({ ideaId: '1' }));

    InboxEffects
      .deleteIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.removeIdeaActions.ideaRemovalError({
            errorMessage: 'Idea deletion failed',
          })
        );
      });
  });

  it('should return readIdeasSuccess action on readIdeas success', () => {
    ideasHttpService = {
      readIdeas: () => of([{ id: '1', content: 'Content' }]),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startReadIdeas());

    InboxEffects
      .readIdeas(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.readIdeasActions.readIdeasSuccess({
            ideas: [{ id: '1', content: 'Content' }],
            successMessage: 'Ideas read successfully',
          })
        );
      });
  });

  it('should return readIdeasError action on readIdeas error', () => {
    ideasHttpService = {
      readIdeas: () => throwError(() => new Error()),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startReadIdeas());

    InboxEffects
      .readIdeas(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.readIdeasActions.readIdeasError({
            errorMessage: 'Ideas read failed',
          })
        );
      });
  });

  it('should return ideaUpdationSuccess action on updateIdea success', () => {
    ideasHttpService = {
      updateIdea: (idea: Idea) => of(idea.content),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startIdeaUpdate(
      { idea: { id: '1', content: 'Updated Content' } })
    );

    InboxEffects
      .updateIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.updateIdeaActions.ideaUpdationSuccess({
            idea: { id: '1', content: 'Updated Content' },
            successMessage: 'Idea updated Successfully'
          })
        );
      });
  });

  it('should return ideaUpdationError action on updateIdea error', () => {
    ideasHttpService = {
      updateIdea: () => throwError(() => new Error()),
    } as unknown as IdeasHttpService;

    const action$ = of(InboxActions.startIdeaUpdate(
      { idea: { id: '1', content: 'Updated Content' } })
    );

    InboxEffects
      .updateIdea(action$, ideasHttpService)
      .subscribe(action => {
        expect(action).toEqual(
          InboxActions.updateIdeaActions.ideaUpdationError({
            errorMessage: 'Idea update failed',
          })
        );
      });
  });
});
