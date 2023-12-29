import { Action } from '@ngrx/store';

import * as fromInbox from './inbox.reducer';
import * as InboxActions from './inbox.actions';

describe('Inbox reducer', () => {
  const initialState: fromInbox.InboxState = {
    areIdeasLoaded: false,
    dbErrorMessage: null,
    dbSuccessMessage: null,
    ideaToEdit: null,
    ideas: [],
    isEditMode: false,
  };

  const initialStateWithIdea: fromInbox.InboxState = {
    ...initialState,
    ideas: [{ id: '1', content: 'Content' }],
  };

  const initialStateWithErrorMessage: fromInbox.InboxState = {
    ...initialState,
    dbErrorMessage: 'Error message',
  };

  const initialStateWithSuccessMessage: fromInbox.InboxState = {
    ...initialState,
    dbSuccessMessage: 'Success message',
  };

  const initialStateWithEditMode: fromInbox.InboxState = {
    ...initialState,
    ideaToEdit: { id: '1', content: 'Content' },
    isEditMode: true,
  };

  it('should return initialState value when unknown action is dispatched', () => {
    const unknownAction: Action = { type: 'Unknown' };
    const resultState = fromInbox.inboxReducer(initialState, unknownAction);

    expect(resultState).toBe(initialState);
  });

  it('should add idea and update the state in an immutable way', () => {
    const action: Action = InboxActions.createIdeaActions.ideaCreationSuccess({
      idea: { id: '1', content: 'Content' },
      successMessage: 'Success message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      dbSuccessMessage: 'Success message',
      ideas: [{ id: '1', content: 'Content' }],
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should remove idea and update the state in an immutable way', () => {
    const action: Action = InboxActions.removeIdeaActions.ideaRemovalSuccess({
      ideaId: '1',
      successMessage: 'Success message'
    });

    const resultState  = fromInbox.inboxReducer(initialStateWithIdea, action);

    const expectedState: fromInbox.InboxState = {
      ...initialStateWithIdea,
      dbSuccessMessage: 'Success message',
      ideas: [],
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialStateWithIdea);
  });

  it('should read ideas and update the state in an immutable way', () => {
    const action: Action = InboxActions.readIdeasActions.readIdeasSuccess({
      ideas: [{ id: '1', content: 'Content' }],
      successMessage: 'Success message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      areIdeasLoaded: true,
      dbSuccessMessage: 'Success message',
      ideas: [{ id: '1', content: 'Content' }],
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should update idea and update the state in an immutable way', () => {
    const action: Action = InboxActions.updateIdeaActions.ideaUpdationSuccess({
      idea: { id: '1', content: 'Updated Content' },
      successMessage: 'Success message'
    });

    const resultState  = fromInbox.inboxReducer(initialStateWithIdea, action);

    const expectedState: fromInbox.InboxState = {
      ...initialStateWithIdea,
      dbSuccessMessage: 'Success message',
      ideas: [{ id: '1', content: 'Updated Content' }],
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialStateWithIdea);
  });

  it('should add error message after idea creation failure and update the state in an immutable way', () => {
    const action: Action = InboxActions.createIdeaActions.ideaCreationError({
      errorMessage: 'Error message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      dbErrorMessage: 'Error message',
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should add error message after idea removal failure and update the state in an immutable way', () => {
    const action: Action = InboxActions.removeIdeaActions.ideaRemovalError({
      errorMessage: 'Error message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      dbErrorMessage: 'Error message',
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should add error message after ideas reading failure and update the state in an immutable way', () => {
    const action: Action = InboxActions.readIdeasActions.readIdeasError({
      errorMessage: 'Error message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      dbErrorMessage: 'Error message',
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should add error message after idea updation failure and update the state in an immutable way', () => {
    const action: Action = InboxActions.updateIdeaActions.ideaUpdationError({
      errorMessage: 'Error message'
    });

    const resultState  = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      dbErrorMessage: 'Error message',
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should clear error message and update the state in an immutable way', () => {
    const action: Action = InboxActions.clearDbErrorMessage();

    const resultState = fromInbox.inboxReducer(initialStateWithErrorMessage, action);

    const expectedState: fromInbox.InboxState = {
      ...initialStateWithErrorMessage,
      dbErrorMessage: null,
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialStateWithErrorMessage);
  });

  it('should clear success message and update the state in an immutable way', () => {
    const action: Action = InboxActions.clearDbSuccessMessage();

    const resultState = fromInbox.inboxReducer(initialStateWithSuccessMessage, action);

    const expectedState: fromInbox.InboxState = {
      ...initialStateWithSuccessMessage,
      dbSuccessMessage: null,
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialStateWithSuccessMessage);
  });

  it('should set idea to edit and update the state in an immutable way', () => {
    const action: Action = InboxActions.ideaActions.setIdeaToEdit({
      idea: { id: '1', content: 'Content' },
    });

    const resultState = fromInbox.inboxReducer(initialState, action);

    const expectedState: fromInbox.InboxState = {
      ...initialState,
      ideaToEdit: { id: '1', content: 'Content' },
      isEditMode: true,
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialState);
  });

  it('should stop edit mode and update the state in an immutable way', () => {
    const action: Action = InboxActions.stopEditMode();

    const resultState = fromInbox.inboxReducer(initialStateWithEditMode, action);

    const expectedState: fromInbox.InboxState = {
      ...initialStateWithEditMode,
      ideaToEdit: null,
      isEditMode: false,
    };

    expect(resultState).toEqual(expectedState);
    expect(resultState).not.toBe(initialStateWithEditMode);
  });
});
