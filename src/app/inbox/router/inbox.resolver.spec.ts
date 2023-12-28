import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';

import { inboxResolver } from './inbox.resolver';

describe('inboxResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => inboxResolver(...resolverParameters));

  const initialState = {
    inbox: {
      areIdeasLoaded: false,
    },
  };

  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })]
    });

    store = TestBed.inject(MockStore)
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should return false when ideas are not loaded', () => {
    const mockRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockState: RouterStateSnapshot = {} as RouterStateSnapshot;
    (executeResolver(mockRoute, mockState) as Observable<boolean>).subscribe(areIdeasLoaded => {
      expect(areIdeasLoaded).toBeFalse();
    });
  });

  it('should return true when ideas are loaded', () => {
    store.setState({
      inbox: {
        areIdeasLoaded: true,
      },
    });

    const mockRoute: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockState: RouterStateSnapshot = {} as RouterStateSnapshot;
    (executeResolver(mockRoute, mockState) as Observable<boolean>).subscribe(areIdeasLoaded => {
      expect(areIdeasLoaded).toBeTrue();
    });
  });
});
