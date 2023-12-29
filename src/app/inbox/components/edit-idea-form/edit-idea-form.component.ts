import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from '../../../typings/store';

import * as InboxActions from '../../store/inbox.actions';
import * as InboxSelectors from '../../store/inbox.selectors';

@Component({
  selector: 'app-edit-idea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-idea-form.component.html',
})
export class EditIdeaFormComponent implements OnDestroy, OnInit {
  private store = inject<Store<AppState>>(Store);

  editedIdeaContent: string = '';
  editedIdeaId!: string;
  ideaToEditSubscription!: Subscription;

  ngOnInit(): void {
    this.ideaToEditSubscription = this.store
      .select(InboxSelectors.selectIdeaToEdit)
      .subscribe(ideaToEdit => {
        this.editedIdeaContent = ideaToEdit && ideaToEdit.content || '';
        this.editedIdeaId = ideaToEdit && ideaToEdit.id || '';
      });
  }

  ngOnDestroy(): void {
    this.ideaToEditSubscription.unsubscribe();
  }

  submitIdea(): void {
    if(!this.editedIdeaContent.trim()) {
      return;
    }

    this.store.dispatch(InboxActions.startIdeaUpdate({
      idea: {
        id: this.editedIdeaId,
        content: this.editedIdeaContent,
      }
    }));
  }

  cancelEdition(): void {
    this.store.dispatch(InboxActions.stopEditMode());
  }
}
