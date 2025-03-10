import { Provider } from "@angular/core";
import { NgxNotificationsService, } from "./ngx-amc-notifications.service";

export const provideNgxNotifications = (): Provider[] => [
    {
        provide: NgxNotificationsService,
        useClass: NgxNotificationsService,
    },
];
