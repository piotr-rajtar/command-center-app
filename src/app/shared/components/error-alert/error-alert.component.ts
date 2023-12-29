import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [],
  templateUrl: './error-alert.component.html',
})
export class ErrorAlertComponent {
  @Input({ required: true }) message!: string;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
