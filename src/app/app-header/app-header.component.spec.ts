import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { DropdownService } from '../shared/services/dropdown.service';
import { DummyComponent, click, dropdownServiceMock } from '../testing/utils';

import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let router: Router;
  let dropdownService: DropdownService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppHeaderComponent,
        RouterTestingModule.withRoutes([
          { path: '', component: DummyComponent },
          { path: 'inbox', component: DummyComponent },
          { path: 'lists', component: DummyComponent }
        ]),
      ],
      providers: [
        {
          provide: DropdownService,
          useValue: dropdownServiceMock,
        }
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    dropdownService = TestBed.inject(DropdownService);
    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;

    dropdownService.closeDropdown();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to root route after home item click', fakeAsync(() => {
    const homeNavItemDe = fixture.debugElement.query(By.css('[testId="homeLink"]'));
    click(homeNavItemDe.nativeElement);

    flush();

    expect(router.url).toBe('/');
  }));

  it('should navigate to inbox route after inbox item click', fakeAsync(() => {
    const inboxNavItemDe = fixture.debugElement.query(By.css('[testId="inboxLink"]'));
    click(inboxNavItemDe.nativeElement);

    flush();

    expect(router.url).toBe('/inbox');
  }));

  it('should navigate to lists route after lists item click', fakeAsync(() => {
    const listsNavItemDe = fixture.debugElement.query(By.css('[testId="listsLink"]'));
    click(listsNavItemDe.nativeElement);

    flush();

    expect(router.url).toBe('/lists');
  }));

  it('should show mobile menu after mobile menu button click, when mobile menu is hide', () => {
    const mobileMenuButtonDe = fixture.debugElement.query(By.css('[testId="mobileMenuButton"]'));
    const mobileMenuDe = fixture.debugElement.query(By.css('[testId="mobileMenu"]'));

    click(mobileMenuButtonDe.nativeElement);

    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBeTrue();
    expect(mobileMenuDe.classes['show']).toBeTrue();
  });

  it('should hide mobile menu after mobile menu button click, when mobile menu is showed', () => {
    component.toggleMobileMenu(new Event('click'));

    fixture.detectChanges();

    const mobileMenuButtonDe = fixture.debugElement.query(By.css('[testId="mobileMenuButton"]'));
    const mobileMenuDe = fixture.debugElement.query(By.css('[testId="mobileMenu"]'));

    click(mobileMenuButtonDe.nativeElement);

    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBeFalse();
    expect(mobileMenuDe.classes['show']).toBeFalsy();
  });

  it('should hide mobile menu after nav item click', () => {
    component.toggleMobileMenu(new Event('click'));

    fixture.detectChanges();

    const mobileMenuDe = fixture.debugElement.query(By.css('[testId="mobileMenu"]'));
    const homeNavItemDe = fixture.debugElement.query(By.css('[testId="homeLink"]'));

    click(homeNavItemDe.nativeElement);

    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBeFalse();
    expect(mobileMenuDe.classes['show']).toBeFalsy();
  });
});
