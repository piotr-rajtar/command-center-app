import { AppState } from '../../typings/store';

import * as InboxSelectors from './inbox.selectors';

describe('Inbox selectors', () => {
  const initialState: AppState = {
    inbox: {
      areIdeasLoaded: true,
      dbErrorMessage: null,
      dbSuccessMessage: null,
      ideaToEdit: {
        id: '1',
        content: 'Test idea',
      },
      ideas: [
        {
          id: '1',
          content: 'Test idea',
        }
      ],
      isEditMode: true,
    },
  };

  it('should select the areIdeasLoaded prop', () => {
    const areIdeasLoaded = InboxSelectors.selectAreIdeasLoaded(initialState);

    expect(areIdeasLoaded).toBeTrue();
  });

  it('should select the ideas', () => {
    const ideas = InboxSelectors.selectIdeas(initialState);

    expect(ideas).toBeTruthy();
    expect(ideas.length).toBe(1);
    expect(ideas[0].id).toBe('1');
    expect(ideas[0].content).toBe('Test idea');
  });

  it('should select the idea to edit', () => {
    const ideaToEdit = InboxSelectors.selectIdeaToEdit(initialState);

    expect(ideaToEdit).toBeTruthy();
    expect(ideaToEdit?.id).toBe('1');
    expect(ideaToEdit?.content).toBe('Test idea');
  });

  it('should select the isEditMode prop', () => {
    const isEditMode = InboxSelectors.selectIsEditMode(initialState);

    expect(isEditMode).toBeTrue();
  });
});
