import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationsService, Notification } from '../services/notifications.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  public addPersonVisible: boolean = false;
  private subscription: Subscription;

  constructor(private notificationService: NotificationsService, private snackBar: MatSnackBar) {
    this.subscription = notificationService.subscribe(this.notificationReceived.bind(this));
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  toggleAddPerson() {
    this.addPersonVisible = !this.addPersonVisible;
  }

  private notificationReceived(notification: Notification) {
    if (notification !== null && notification.name === "game") {
      this.snackBar.open(notification.description, 'Ok');
    }
  }

}
