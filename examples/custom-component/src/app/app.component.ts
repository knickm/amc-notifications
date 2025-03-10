import { Component, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxNotificationsService } from 'ngx-amc-notifications';

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
    this.notificationsService.setConfig({ horizontalPosition: 'left', verticalPosition: 'bottom' });
    this.notificationsService.add('Alice entered the chat!', { component: ChildComponent, duration: 5000 });
    setTimeout(() => this.notificationsService.add('Bob entered the chat!', { component: ChildComponent, duration: 5000 }), 2000);
    setTimeout(() => this.notificationsService.add('Nick entered the chat!', { component: ChildComponent, duration: 5000 }), 4000);
  }
}

@Component({
  selector: 'app-child',
  template: '{{data?.text}}',
  styles: [`:host{ color: #000;opacity:1;font-weight:bold;}`]
})
export class ChildComponent {
  @Input()
  data?: any;
}