import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService, Notification } from '../../../services/notifications.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Person } from '../../models/person.model';


@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ListPeopleComponent implements AfterViewInit, OnDestroy {
  public people: Person[];
  public expandedElement: Person;
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
    if (notification !== undefined && notification !== null && notification.name === "person-added") {
      this.loadPeople();

      this.snackBar.open('New Person Added', null, { duration: 900 });
    }
  }
}
