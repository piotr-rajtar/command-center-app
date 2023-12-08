import { Component, OnDestroy, effect, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription, fromEvent, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ RouterModule ],
  templateUrl: './app-header.component.html',
  styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnDestroy {
  isMobileMenuOpen = signal(false);

  outsideClickSubscription?: Subscription;

  constructor() {
    effect(() => {
      if(this.isMobileMenuOpen()) {
        this.setOutsideClickSubscription();
      }
    })

    effect(() => {
      if(!this.isMobileMenuOpen() && this.outsideClickSubscription) {
        this.outsideClickSubscription.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    if(this.outsideClickSubscription) {
      this.outsideClickSubscription.unsubscribe();
    }
  }

  setOutsideClickSubscription(): void {
    this.outsideClickSubscription = fromEvent(document, 'click')
      .pipe(
        tap(() => this.isMobileMenuOpen.set(false)),
      )
      .subscribe();
  }

  closeMenu(event: Event) {
    this.isMobileMenuOpen.set(false);
    event.stopPropagation();
  }

  toggleMobileMenu(event: Event) {
    this.isMobileMenuOpen.update(isMobileMenuOpen => !isMobileMenuOpen);
    event.stopPropagation();
  }
}
