import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { v4 } from 'uuid';

import { Idea } from '../../typings';

import { AddIdeaFormComponent } from '../add-idea-form/add-idea-form.component';
import { EditIdeaFormComponent } from '../edit-idea-form/edit-idea-form.component';

import { IdeaListComponent } from '../idea-list/idea-list.component';

@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [FormsModule, IdeaListComponent, AddIdeaFormComponent, EditIdeaFormComponent],
  templateUrl: './inbox-container.component.html',
  styleUrl: './inbox-container.component.scss'
})
export class InboxContainerComponent {
  idea = '';
  ideas: Idea[] = [];

  isIdeaFormInEditMode = false;

  addIdea(idea: string) {
  }

  editIdea(idea: string) {
    //TODO: handle idea edition
  }

  assignIdea(ideaId: string) {
    //TODO: handle idea assignment
  }

  setEditMode(ideaId: string) {
    //TODO: handle idea edition
  }

  removeIdea(ideaId: string) {
    //TODO: handle idea removal
  }
}
