import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
} from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { INBOX_FEATURE_KEY, inboxReducer } from './inbox/store/inbox.reducer';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
        [INBOX_FEATURE_KEY]: inboxReducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects()
],
};
