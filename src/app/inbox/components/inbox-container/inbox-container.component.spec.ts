import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { InboxContainerComponent } from './inbox-container.component';

describe('InboxContainerComponent', () => {
  let component: InboxContainerComponent;
  let fixture: ComponentFixture<InboxContainerComponent>;
  let store: MockStore;

  const initialState = {
    inbox: {
      isEditMode: false,
      ideas: [],
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxContainerComponent],
      providers: [provideMockStore({ initialState })],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(InboxContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display EditIdeaForm component when edit mode is on', () => {
    store.setState({
      inbox: {
        isEditMode: true,
        ideas: [],
      },
    });

    fixture.detectChanges();

    const editIdeaFormDe = fixture.debugElement.query(By.css('app-edit-idea-form'));

    expect(editIdeaFormDe).toBeTruthy();
  });

  it('should display AddIdeaForm component when edit mode is off', () => {
    const addIdeaFormDe = fixture.debugElement.query(By.css('app-add-idea-form'));

    expect(addIdeaFormDe).toBeTruthy();
  });

  it('should display IdaList component when some ideas present', () => {
    store.setState({
      inbox: {
        isEditMode: false,
        ideas: [{ id: '1', content: 'Test' }],
      },
    });

    fixture.detectChanges();

    const ideaListDe = fixture.debugElement.query(By.css('app-idea-list'));

    expect(ideaListDe).toBeTruthy();
  });

  it('should not display IdeaList component when no ideas added', () => {
    const ideaListDe = fixture.debugElement.query(By.css('app-idea-list'));

    expect(ideaListDe).toBeFalsy();
  });
});
