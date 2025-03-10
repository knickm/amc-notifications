import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideNgxNotifications } from 'ngx-amc-notifications';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideNgxNotifications(),
  ]
};
