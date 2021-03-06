import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { NotificationsService, Notification } from '../../../services/notifications.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  public person: Person;

  constructor(private http: HttpClient,
    private snackBar: MatSnackBar,
    private notificationService: NotificationsService) {
    this.person = new Person();
  }

  ngOnInit() {
  }

  addContact() {
    this.http.post('person', this.person).subscribe(_ => {
      this.notificationService.notify(new Notification("person-added")).then(() => {
        this.person = new Person();
      });
    }, error => {
      if (error.status === 409) {
        this.snackBar.open('You already have this person', null,
          {
            duration: 900
          });
      } else if (error.status === 400) {
        this.snackBar.open('All fields must be populated',
          null,
          {
            duration: 900
          });
      }
    });
  }
}
