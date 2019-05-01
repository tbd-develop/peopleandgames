import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService, Notification } from '../../../services/notifications.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements AfterViewInit, OnDestroy {
  public people: Person[];
  public displayedColumns: string[] = ["firstName", "lastName", "email", "phone"];
  private subscription: Subscription;

  constructor(private http: HttpClient, private notifications: NotificationsService) {
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
    }
  }
}

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
