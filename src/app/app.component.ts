import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppHeaderComponent } from './app-header/app-header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AppHeaderComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
