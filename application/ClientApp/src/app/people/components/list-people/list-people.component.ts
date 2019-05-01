import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService, Notification } from '../../../services/notifications.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements AfterViewInit, OnDestroy {
  public people: Person[];
  public displayedColumns: string[] = ["firstName", "lastName", "email", "phone"];
  private subscription: Subscription;

  constructor(private http: HttpClient, private notifications: NotificationsService, private snackBar: MatSnackBar) {
    this.subscription = this.notifications.subscribe(this.notificationReceived.bind(this));
  }

  ngAfterViewInit() {
    this.loadPeople();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadPeople() {
    this.http.get<Person[]>('people').subscribe(results => {
      this.people = results;
    });
  }

  private notificationReceived(notification: Notification) {
    if (notification !== undefined && notification !== null) {
      this.loadPeople();
      this.snackBar.open('New Person Added', null, { duration: 900 });
    }
  }
}

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
