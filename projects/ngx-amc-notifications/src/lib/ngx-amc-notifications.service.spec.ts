import { TestBed } from '@angular/core/testing';

import { NgxAmcNotificationsService } from './ngx-amc-notifications.service';

describe('NgxAmcNotificationsService', () => {
  let service: NgxAmcNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAmcNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
