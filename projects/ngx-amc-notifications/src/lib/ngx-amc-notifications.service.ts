import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ComponentType } from '@angular/cdk/portal';
import { BehaviorSubject, Subscription } from 'rxjs';

import { NgxAmcNotificationsComponent } from './ngx-amc-notifications/ngx-amc-notifications.component';

export interface NotificationMessage {
  text: string;
  type: 'success' | 'error' | 'warning' | 'message';
  icon?: string;
}

export interface NotificationConfig {
  id: number;
  data: NotificationMessage;
  duration?: number;
  component?: ComponentType<any>;
}

const NOTIFY_DEFAULT_CONFIG: MatSnackBarConfig<NotificationMessage> = {
  // duration: 10000, // :number The length of time in milliseconds to wait before automatically dismissing the snack bar.
  horizontalPosition: 'center', // :MatSnackBarHorizontalPosition The horizontal position to place the snack bar.
  verticalPosition: 'top', // : MatSnackBarVerticalPosition The vertical position to place the snack bar.
  panelClass: 'transparent-block',

  // announcementMessage: string; // Message to be announced by the LiveAnnouncer. When opening a snackbar without a custom component or template, the announcement message will default to the specified message.
  // data: D | null; //Data being injected into the child component.
  // direction: Direction; // Text layout direction for the snack bar.
  // panelClass: string | string[]; // Extra CSS classes to be added to the snack bar container.
  // politeness: AriaLivePoliteness; // The politeness level for the MatAriaLiveAnnouncer announcement.
  // verticalPosition: MatSnackBarVerticalPosition; // The vertical position to place the snack bar.
  // viewContainerRef: ViewContainerRef; // The view container that serves as the parent for the snackbar for the purposes of dependency injection. Note: this does not affect where the snackbar is inserted in the DOM.
}

@Injectable()
export class NgxNotificationsService {

  readonly notifyStore = new BehaviorSubject<NotificationConfig | null>(null);

  private _id = 0;
  private visible = false;
  private config: MatSnackBarConfig = { ...NOTIFY_DEFAULT_CONFIG };

  private readonly snackBar = inject(MatSnackBar);
  private readonly subscription = new Subscription();

  setConfig(config: MatSnackBarConfig) {
    this.config = { ...this.config, ...config }
  }

  add(_notify: string | NotificationMessage, options?: Omit<NotificationConfig, "id" | "data">) {
    let notify: NotificationMessage;
    if (typeof _notify === 'string') {
      notify = createMessageNotification(_notify)
    } else {
      notify = { ..._notify };
    }
    this.notifyStore.next({ id: this._id++, data: notify, duration: options?.duration ?? this.config.duration, component: options?.component })

    if (!this.visible) {
      this.visible = true;
      this.snackBar.openFromComponent(NgxAmcNotificationsComponent, this.config);
    }
  }

  done() {
    this.visible = false;
    this.snackBar.dismiss();
    this.subscription.unsubscribe();
  }
}

export const createErrorNotification = (text: string): NotificationMessage => {
  return {
    text,
    type: 'error',
    icon: 'error'
  }
}

export const createWarningNotification = (text: string): NotificationMessage => {
  return {
    text,
    type: 'warning',
    icon: 'warning'
  }
}

export const createSuccessNotification = (text: string): NotificationMessage => {
  return {
    text,
    type: 'success',
    icon: 'done'
  }
}

export const createMessageNotification = (text: string): NotificationMessage => {
  return {
    text,
    type: 'message',
    icon: 'notifications'
  }
}
