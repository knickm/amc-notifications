import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Subject, Subscription } from 'rxjs';

import { NotificationConfig, NgxNotificationsService } from '../ngx-amc-notifications.service';

@Component({
  selector: 'ngx-amc-notifications',
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './ngx-amc-notifications.component.html',
  styleUrl: './ngx-amc-notifications.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxAmcNotificationsComponent implements OnInit, OnDestroy {

  messages = signal<NotificationConfig[]>([]);
  subscription?: Subscription;
  private timeoutList: Record<number, any> = {}
  private readonly cd = inject(ChangeDetectorRef);
  private readonly notificationService = inject(NgxNotificationsService);

  ngOnInit(): void {
    const data: Subject<NotificationConfig | null> = this.notificationService.notifyStore;
    this.subscription = data.subscribe(n => {
      if (n) {
        this.messages.update(v => [...v, n])
        if (n.duration) {
          this.timeoutList[n.id] = setTimeout(() => (this.close(n.id), delete this.timeoutList[n.id]), n.duration);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.notificationService.done()
    this.subscription?.unsubscribe();
    Object.values(this.timeoutList).forEach(id => clearTimeout(id));
  }

  close(id: number) {
    this.messages.update(v => v.filter(v => v.id !== id));
    if (this.timeoutList[id]) {
      clearTimeout(this.timeoutList[id]);
      delete this.timeoutList[id];
    }
    if (this.messages().length === 0) {
      this.notificationService.done();
    } else {
      this.cd.markForCheck();
    }
  }
}