import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

@Component({})
class DummyComponent {};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HomeComponent,
        RouterTestingModule.withRoutes([
          { path: 'inbox', component: DummyComponent },
          { path: 'lists', component: DummyComponent }
        ]),
      ],
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to inbox route after open button click', fakeAsync(() => {
    component.openCard('inbox');

    flush();

    expect(router.url).toBe('/inbox');
  }));

  it('should navigate to inbox route after open button click', fakeAsync(() => {
    component.openCard('lists');

    flush();

    expect(router.url).toBe('/lists');
  }));
});
