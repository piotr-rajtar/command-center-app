import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../../typings/store';

import * as InboxActions from '../../store/inbox.actions';

@Component({
  selector: 'app-add-idea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-idea-form.component.html',
  styleUrl: './add-idea-form.component.scss'
})
export class AddIdeaFormComponent {
  private store = inject<Store<AppState>>(Store);

  idea = '';

  submitIdea() {
    if(!this.idea.trim()) {
      return;
    }

    this.store.dispatch(
      InboxActions.startIdeaCreation({ idea: this.idea.trim() })
    );

    this.idea = '';
  }
}
