import { Component, inject, OnInit } from '@angular/core';
import { createErrorNotification, createSuccessNotification, createWarningNotification, NgxNotificationsService } from 'ngx-amc-notifications';

@Component({
  selector: 'app-root',
  imports: [],
  template: '',
})
export class AppComponent implements OnInit {
  notificationsService = inject<NgxNotificationsService>(NgxNotificationsService);

  ngOnInit(): void {
    // Send notifications with duration
    this.notificationsService.add(createSuccessNotification('Data store sucsesfuly 1!'), { duration: 10000 })
    this.notificationsService.add(createSuccessNotification('Data store sucsesfuly 2!'), { duration: 6000 })
    this.notificationsService.add(createWarningNotification('Data store warning!'), { duration: 3000 })
    this.notificationsService.add(createErrorNotification('Error! Cannot store data!'), { duration: 3000 })

    // Send notifications without duration. These notifications will be active until you close them by clicking the button with a cross.
    this.notificationsService.add('Message!')
    this.notificationsService.add(
      {
        text: 'Error!', type: 'error',
        icon: 'error'
      },
    )
  }
}
