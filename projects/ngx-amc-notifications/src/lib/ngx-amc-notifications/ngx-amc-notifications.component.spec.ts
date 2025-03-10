import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxAmcNotificationsComponent } from './ngx-amc-notifications.component';

describe('NgxAmcNotificationsComponent', () => {
  let component: NgxAmcNotificationsComponent;
  let fixture: ComponentFixture<NgxAmcNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxAmcNotificationsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxAmcNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
