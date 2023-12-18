import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-idea-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-idea-form.component.html',
  styleUrl: './add-idea-form.component.scss'
})
export class AddIdeaFormComponent {
  @Output() addIdea = new EventEmitter<string>();

  @ViewChild('ideaForm') ideaForm?: NgForm;

  idea = '';

  get isSubmitButtonDisabled(): boolean {
    return !(this.ideaForm?.valid && this.idea.trim().length);
  }

  submitIdea() {
    if(!this.idea.trim()) {
      return;
    }

    this.addIdea.emit(this.idea);

    this.idea = '';
  }
}
