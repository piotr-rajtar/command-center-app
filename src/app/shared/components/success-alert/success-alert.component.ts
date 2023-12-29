import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-success-alert',
  standalone: true,
  imports: [],
  templateUrl: './success-alert.component.html',
})
export class SuccessAlertComponent {
  @Input({ required: true }) message!: string;

  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
