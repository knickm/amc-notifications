import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { createSuccessNotification, createWarningNotification, NgxNotificationsService } from 'ngx-amc-notifications';

@Component({
  selector: 'app-root',
  imports: [
    MatIconModule,
  ],
  template: '',
})
export class AppComponent implements OnInit {
  notificationsService = inject<NgxNotificationsService>(NgxNotificationsService);

  ngOnInit(): void {
    this.notificationsService.add(createSuccessNotification('Data store sucsesfuly 1!'), { duration: 10000 })
    this.notificationsService.add(createSuccessNotification('Data store sucsesfuly 2!'), { duration: 6000 })
    this.notificationsService.add(createWarningNotification('Data store warning!'), { duration: 3000 })
    this.notificationsService.add('Message!')
    this.notificationsService.add(
      {
        text: 'Message!', type: 'error',
        icon: 'error'
      },
    )
  }
}
